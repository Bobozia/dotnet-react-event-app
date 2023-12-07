using DTOs;
using Helpers;
using Microsoft.AspNetCore.Identity;
using Models;

namespace Services
{
    public class AuthenticationService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly JWTCreator _jwtCreator;

        public AuthenticationService(UserManager<User> userManager, SignInManager<User> signInManager, JWTCreator jwtCreator)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtCreator = jwtCreator;
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

        public async Task<(bool, string)> Login(LoginRequest loginRequest)
        {
            SignInResult result = await _signInManager.PasswordSignInAsync(loginRequest.UserName, loginRequest.Password, false, false);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByNameAsync(loginRequest.UserName);
                var roles = await _userManager.GetRolesAsync(user!);

                var token = _jwtCreator.Generate(user!, roles.ToList());
                return (true, token);
            }

            return (false, "");
        }

    }
}