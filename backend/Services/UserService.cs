using Data;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Services
{

    public class UserService
    {
        private readonly DatabaseContext _context;

        public UserService(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<string> GetUserId(string userName)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (user != null)
                return user.Id;
            return null!;
        }

        public async Task<User?> GetUser(string userName)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (user != null)
                return user;
            return null!;
        }

        public async Task<User?> GetUserWithEvents(string userName)
        {
            User? user = await _context.Users.Include(u => u.Events).FirstOrDefaultAsync(u => u.UserName == userName);
            if (user != null)
                return user;
            return null!;
        }
    }
}