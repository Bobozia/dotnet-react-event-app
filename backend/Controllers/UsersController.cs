using Microsoft.AspNetCore.Mvc;
using Services;
using Models;
using DTOs;

namespace Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    //private readonly UserService _userService;
    private readonly AuthenticationService _authenticationService;

    public UsersController(UserService userService, AuthenticationService authenticationService)
    {
        //_userService = userService;
        _authenticationService = authenticationService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
    {
        try
        {
            (bool success, string errors) = await _authenticationService.Register(registerRequest);

            if (success)
            {
                bool addedRole = await _authenticationService.AddRole(registerRequest.UserName, "User");
                if (!addedRole)
                    return BadRequest(new RegisterResponse { Success = false, Message = "Failed to add role" });
                return Ok(new RegisterResponse { Success = true, Message = "User created successfully" });
            }
            return BadRequest(new RegisterResponse { Success = false, Message = errors });
        }
        catch (Exception ex)
        {
            return BadRequest(new RegisterResponse { Success = false, Message = ex.Message });
        }
    }

    /*TODO:
    * login
    * ping for logged in user
    * logout
    * cookies
    */



    //[HttpPost]
    // public async Task<IActionResult> Create([FromServices] DatabaseContext context, [FromBody] User user)
    // {
    //     if (!ModelState.IsValid)
    //     {
    //         return BadRequest(ModelState);
    //     }

    //     await context.Users.AddAsync(user);
    //     await context.SaveChangesAsync();

    //     return CreatedAtRoute("GetUser", new { id = user.Id }, user);
    // }
}