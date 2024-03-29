using Microsoft.AspNetCore.Mvc;
using Services;
using Models;
using DTOs;
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

    [HttpGet("{name}")]
    public async Task<IActionResult> GetEvent(string name)
    {
        try
        {
            Event? foundEvent = await _eventService.GetEventByName(name);
            if (foundEvent != null)
                return Ok(new EventResponse { Success = true, Message = "Event found", Event = foundEvent });
            return BadRequest(new EventResponse { Success = false, Message = "Event not found" });
        }
        catch (Exception ex)
        {
            return BadRequest(new EventResponse { Success = false, Message = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetEvents([FromQuery] string filter, [FromQuery] int page, [FromQuery] int pageSize)
    {
        try
        {
            (List<Event>? events, int numberOfPages) = await _eventService.GetEvents(filter, page, pageSize);
            if (events != null)
                return Ok(new EventsResponse { Success = true, Message = "Events found", Events = events, NumberOfPages = numberOfPages });
            return BadRequest(new EventsResponse { Success = false, Message = "Events not found" });
        }
        catch (Exception ex)
        {
            return BadRequest(new EventsResponse { Success = false, Message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> DeleteEvent(string id)
    {
        try
        {
            User? user = await _userService.GetUser(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
            Event? foundEvent = await _eventService.GetEventById(id);
            if (foundEvent != null && foundEvent.UserId == user!.Id)
            {
                await _eventService.DeleteEvent(foundEvent);
                return Ok(new EventResponse { Success = true, Message = "Event deleted successfully", Event = foundEvent });
            }
            return BadRequest(new EventResponse { Success = false, Message = "Event not found or you don't have permissions to delete this event" });
        }
        catch (Exception ex)
        {
            return BadRequest(new EventResponse { Success = false, Message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> UpdateEvent(string id, [FromBody] UpdateEventRequest request)
    {
        try
        {
            User? user = await _userService.GetUser(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
            Event? foundEvent = await _eventService.GetEventById(id);
            if (foundEvent != null && foundEvent.UserId == user!.Id)
            {
                foundEvent = await _eventService.UpdateEvent(foundEvent, request);
                return Ok(new EventResponse { Success = true, Message = "Event updated successfully", Event = foundEvent });
            }
            return BadRequest(new EventResponse { Success = false, Message = "Event not found or you don't have permissions to delete this event" });
        }
        catch (Exception ex)
        {
            return BadRequest(new EventResponse { Success = false, Message = ex.Message });
        }
    }

    [HttpGet("count")]
    public async Task<IActionResult> GetEventsCount()
    {
        try
        {
            int count = await _eventService.GetEventsCount();
            return Ok(new { Success = true, Message = "Events count found", Count = count });
        }
        catch (Exception ex)
        {
            return BadRequest(new { Success = false, Message = ex.Message });
        }
    }

    [HttpGet("user")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> GetEventsByUser([FromQuery] int page, [FromQuery] int pageSize)
    {
        try
        {
            User? user = await _userService.GetUser(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
            (List<Event>? events, int numberOfPages) = await _eventService.GetEventsByUser(user!, page, pageSize);
            if (events != null)
                return Ok(new EventsResponse { Success = true, Message = "Events found", Events = events, NumberOfPages = numberOfPages });
            return BadRequest(new EventsResponse { Success = false, Message = "Events not found" });
        }
        catch (Exception ex)
        {
            return BadRequest(new EventsResponse { Success = false, Message = ex.Message });
        }
    }

    [HttpGet("random")]
    public async Task<IActionResult> GetRandomEvent(string? userId = null)
    {
        try
        {
            Event? randomEvent = await _eventService.GetRandomEvent(userId);
            if (randomEvent != null)
                return Ok(new EventResponse { Success = true, Message = "Random event found", Event = randomEvent });
            return BadRequest(new EventResponse { Success = false, Message = "Random event not found" });
        }
        catch (Exception ex)
        {
            return BadRequest(new EventResponse { Success = false, Message = ex.Message });
        }
    }
}