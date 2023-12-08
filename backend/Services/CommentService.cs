using Data;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Services
{

    public class CommentService
    {
        private readonly DatabaseContext _context;

        public CommentService(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<Comment?> CreateComment(string content, string eventId, string userId)
        {
            if (await _context.Events.FirstOrDefaultAsync(e => e.Id == eventId) == null)
                throw new Exception("Event not found");
            Comment newComment = new()
            {
                Id = Guid.NewGuid().ToString(),
                Content = content,
                EventId = eventId,
                UserId = userId
            };
            await _context.Comments.AddAsync(newComment);
            await _context.SaveChangesAsync();
            return newComment;
        }
    }
}