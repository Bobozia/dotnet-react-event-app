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

        public async Task<List<Event>> GetEvents()
        {
            List<Event> events = await _context.Events.ToListAsync();
            return events;
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
    }
}