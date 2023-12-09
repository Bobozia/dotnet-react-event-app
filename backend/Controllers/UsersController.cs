using Microsoft.AspNetCore.Mvc;
using Services;
using DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;

namespace Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly UserService _userService;
    private readonly AuthenticationService _authenticationService;

    public UsersController(UserService userService, AuthenticationService authenticationService)
    {
        _userService = userService;
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

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        try
        {
            (bool success, string token) = await _authenticationService.Login(loginRequest);

            if (success)
            {
                Response.Cookies.Append("X-Access-Token", token, new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTimeOffset.UtcNow.AddDays(7)
                });
                string id = await _userService.GetUserId(loginRequest.UserName);
                return Ok(new LoginResponse { Success = true, Message = "User logged in successfully", Id = id });
            }
            return BadRequest(new LoginResponse { Success = false, Message = "Bad credentials" });
        }
        catch (Exception ex)
        {
            return BadRequest(new LoginResponse { Success = false, Message = ex.Message });
        }
    }

    [HttpPost("logout")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public IActionResult Logout()
    {
        try
        {
            Response.Cookies.Delete("X-Access-Token");
            return Ok(new { Success = true, Message = "Logged out successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { Success = false, ex.Message });
        }
    }

    [HttpGet("ping")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public IActionResult Ping()
    {
        var userName = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var user = _userService.GetUserWithEvents(userName!);
        return Ok(new { Success = true, Message = "Logged in, `click`, noice", UserData = user });
    }

    [HttpGet("user")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public IActionResult GetUser()
    {
        var userName = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var user = _userService.GetUser(userName!);
        return Ok(new { Success = true, Message = "Logged in, `click`, noice", UserId = user.Id });
    }
}