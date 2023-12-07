using Data;
using Models;
using Microsoft.EntityFrameworkCore;

namespace Services
{
    public class EventService
    {
        private readonly DatabaseContext _context;

        public EventService(DatabaseContext context)
        {
            _context = context;
        }
        public static byte[] GetDefaultEventImage()
        {
            return File.ReadAllBytes("default-event-image.jpg");
        }
        public async Task<Event?> CreateEvent(string name, string description, string location, DateOnly date, TimeSpan time, byte[] image, string userId)
        {
            Event newEvent = new()
            {
                Id = Guid.NewGuid().ToString(),
                Name = name,
                Description = description,
                Location = location,
                Date = date,
                Time = time,
                Image = image,
                UserId = userId
            };
            await _context.Events.AddAsync(newEvent);
            await _context.SaveChangesAsync();
            return newEvent;
        }

        public async Task<Event?> GetEvent(string id)
        {
            Event? foundEvent = await _context.Events.FirstOrDefaultAsync(e => e.Id == id);
            if (foundEvent != null)
                return foundEvent;
            return null!;
        }
    }
}