using DTOs;
using Microsoft.AspNetCore.Identity;
using Models;

namespace Services
{
    public class AuthenticationService
    {
        // private readonly DatabaseContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AuthenticationService(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<(bool, string)> Register(RegisterRequest registerRequest)
        {
            var user = new User
            {
                UserName = registerRequest.UserName,
                Email = registerRequest.Email
            };

            var result = await _userManager.CreateAsync(user, registerRequest.Password);
            var errors = result.Errors.ToList();

            if (result.Succeeded)
                return (true, "");

            return (false, errors[0].Description.ToString());
        }

        public async Task<bool> AddRole(string userName, string role)
        {
            var user = await _userManager.FindByNameAsync(userName);
            var result = await _userManager.AddToRoleAsync(user!, role);

            if (result.Succeeded)
                return true;

            return false;
        }

    }
}