using Microsoft.AspNetCore.Mvc;
using Services;
using Models;
using DTOs;
using Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Controllers;

[ApiController]
[Route("api/events")]
public class EventsController : ControllerBase
{
    private readonly EventService _eventService;
    private readonly UserService _userService;

    public EventsController(EventService eventService, UserService userService)
    {
        _eventService = eventService;
        _userService = userService;
    }

    [HttpPost]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> CreateEvent([FromBody] CreateEventRequest request)
    {
        var userName = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        try
        {
            User? user = await _userService.GetUser(userName!);
            Event? createdEvent = await _eventService.CreateEvent(request.Name, request.Description, request.Location, request.Date, request.Time, request.Image, user.Id);
            if (createdEvent != null)
                return Ok(new EventResponse { Success = true, Message = "Event created successfully", Event = createdEvent });
            return BadRequest(new EventResponse { Success = false, Message = "Failed to create event" });
        }
        catch (Exception ex)
        {
            return BadRequest(new EventResponse { Success = false, Message = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetEvent(string id)
    {
        try
        {
            Event? foundEvent = await _eventService.GetEvent(id);
            if (foundEvent != null)
                return Ok(new EventResponse { Success = true, Message = "Event found", Event = foundEvent });
            return BadRequest(new EventResponse { Success = false, Message = "Event not found" });
        }
        catch (Exception ex)
        {
            return BadRequest(new EventResponse { Success = false, Message = ex.Message });
        }
    }

    // [HttpGet]

    // [HttpDelete("{id}")]
}