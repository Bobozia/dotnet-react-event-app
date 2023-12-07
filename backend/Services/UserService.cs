using Data;

namespace Services
{

    public class UserService
    {
        private readonly DatabaseContext _context;

        public UserService(DatabaseContext context)
        {
            _context = context;
        }


    }
}