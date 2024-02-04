using Data;
using Models;
using Microsoft.EntityFrameworkCore;
using DTOs;
using System.Reflection;

namespace Services
{
    public class EventService
    {
        private readonly DatabaseContext _context;

        public EventService(DatabaseContext context)
        {
            _context = context;
        }
        private static byte[] GetDefaultEventImage()
        {
            return File.ReadAllBytes("default-event-image.jpg");
        }
        public async Task<Event?> CreateEvent(string name, string description, string location, DateOnly date, TimeOnly time, string image, string userId)
        {
            byte[] img = Array.Empty<byte>();
            if (await _context.Events.AnyAsync(e => e.Name == name)) throw new Exception("Event with that name already exists");
            if (image == null)
                img = GetDefaultEventImage();
            else
                img = Convert.FromBase64String(image.Split(",")[1]);

            Event newEvent = new()
            {
                Id = Guid.NewGuid().ToString(),
                Name = name,
                Description = description,
                Location = location,
                Date = date,
                Time = time,
                Image = img,
                UserId = userId
            };
            await _context.Events.AddAsync(newEvent);
            await _context.SaveChangesAsync();
            return newEvent;
        }

        public async Task<Event?> GetEventById(string id)
        {
            Event? foundEvent = await _context.Events.Include(e => e.Comments).FirstOrDefaultAsync(e => e.Id == id);
            if (foundEvent != null)
                return foundEvent;
            return null!;
        }

        public async Task<Event?> GetEventByName(string name)
        {
            Event? foundEvent = await _context.Events.Include(e => e.Comments).FirstOrDefaultAsync(e => e.Name == name);
            if (foundEvent != null)
            {
                foundEvent.Comments = foundEvent.Comments.OrderByDescending(c => c.CreatedAt).ToList();
                return foundEvent;
            }
            return null!;
        }

        public async Task<(List<Event>, int)> GetEvents(string filter, int page, int pageSize)
        {
            List<Event> events = filter switch
            {
                "upcoming" => await _context.Events.Where(e => e.Date >= DateOnly.FromDateTime(DateTime.Now)).OrderBy(e => e.Date).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync(),
                "past" => await _context.Events.Where(e => e.Date < DateOnly.FromDateTime(DateTime.Now)).OrderByDescending(e => e.Date).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync(),
                _ => await _context.Events.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync(),
            };
            double num = await _context.Events.CountAsync() / (double)pageSize;
            int numberOfPages = (int)Math.Ceiling(num);

            return (events, numberOfPages);
        }

        public async Task<bool> DeleteEvent(Event eventToDelete)
        {
            _context.Events.Remove(eventToDelete);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Event> UpdateEvent(Event eventToUpdate, UpdateEventRequest request)
        {
            int changes = 0;
            foreach (PropertyInfo property in typeof(UpdateEventRequest).GetProperties())
            {
                if (property.GetValue(request) != null && property.GetValue(request)!.ToString() != "")
                {
                    if (property.Name == "Image")
                        eventToUpdate.Image = Convert.FromBase64String(property.GetValue(request)!.ToString()!.Split(",")[1]);
                    else
                        eventToUpdate.GetType().GetProperty(property.Name)?.SetValue(eventToUpdate, property.GetValue(request));
                    changes++;
                }
            }
            if (changes > 0)
            {
                await _context.SaveChangesAsync();
                return eventToUpdate;
            }
            throw new Exception("No changes were made");
        }

        public async Task<int> GetEventsCount()
        {
            return await _context.Events.CountAsync();
        }

        public async Task<(List<Event>, int)> GetEventsByUser(User user, int page, int pageSize)
        {
            if (user != null)
            {
                List<Event> events = await _context.Events.Where(e => e.UserId == user.Id).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
                double num = await _context.Events.Where(e => e.UserId == user.Id).CountAsync() / (double)pageSize;
                int numberOfPages = (int)Math.Ceiling(num);
                return (events, numberOfPages);
            }
            return (null!, 0);
        }

        public async Task<Event> GetRandomEvent(string? userId = null)
        {
            var upcomingEvents = await _context.Events
                .Where(e => e.UserId != userId)
                .Where(e => e.Date > DateOnly.FromDateTime(DateTime.Now))
                .ToListAsync();

            if (!upcomingEvents.Any())
            {
                return null!;
            }

            var random = new Random();
            var randomEvent = upcomingEvents[random.Next(upcomingEvents.Count)];

            return randomEvent;
        }
    }
}