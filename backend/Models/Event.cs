using System.ComponentModel.DataAnnotations.Schema;
using Services;

namespace Models
{
    [Table("Events")]
    public class Event
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public DateOnly Date { get; set; } = new();
        public TimeSpan Time { get; set; }
        public byte[] Image { get; set; } = EventService.GetDefaultEventImage();
        public string UserId { get; set; } = string.Empty;
        public List<Comment> Comments { get; set; } = new();
    }
    [Table("Comments")]
    public class Comment
    {
        public string Id { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string UserId { get; set; } = string.Empty;
        public string EventId { get; set; } = string.Empty;
    }

}