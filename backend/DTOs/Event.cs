using System.ComponentModel.DataAnnotations;
using Models;

namespace Helpers
{
    public class CreateEventRequest
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        [Required]
        public string Location { get; set; } = string.Empty;
        [Required]
        public DateOnly Date { get; set; } = new();
        public TimeSpan Time { get; set; } = new();
        public byte[] Image { get; set; } = Array.Empty<byte>();
    }

    public class EventResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public Event? Event { get; set; } = null;
    }
}