using System.ComponentModel.DataAnnotations;
using Models;

namespace DTOs
{
    public class CreateCommentRequest
    {
        [Required]
        public string Content { get; set; } = string.Empty;
        [Required]
        public string EventId { get; set; } = string.Empty;
    }

    public class CommentResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public Comment? Comment { get; set; } = null;
    }
}