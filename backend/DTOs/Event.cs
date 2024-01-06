using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using Models;

namespace DTOs
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
        public TimeOnly Time { get; set; } = TimeOnly.FromDateTime(DateTime.Now);
        public string? Image { get; set; }
    }

    public class EventResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public Event? Event { get; set; } = null;
    }

    public class EventsResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public List<Event> Events { get; set; } = new();
    }

    public class UpdateEventRequest
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Location { get; set; }
        public DateOnly? Date { get; set; }
        public TimeOnly? Time { get; set; }
        public string? Image { get; set; }
    }
}