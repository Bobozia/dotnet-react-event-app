using Data;
using DTOs;
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
            {
                string id = user.Id;
                return id;
            }
            return null!;
        }

        public async Task<User?> GetUser(string userName)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (user != null)
                return user;
            throw new Exception("User not found");
        }

        public async Task<User?> GetUserWithEvents(string userName)
        {
            User? user = await _context.Users.Include(u => u.Events).FirstOrDefaultAsync(u => u.UserName == userName);
            if (user != null)
                return user;
            return null!;
        }

        public async Task<UserData?> GetUserById(string id)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user != null)
                return new UserData
                {
                    Id = user.Id,
                    UserName = user.UserName!,
                    ProfilePicture = user.ProfilePicture
                };
            return null!;
        }
    }
}