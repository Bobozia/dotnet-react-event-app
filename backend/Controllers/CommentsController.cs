using Microsoft.AspNetCore.Mvc;
using Services;
using Models;
using DTOs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Controllers;

[ApiController]
[Route("api/comments")]
public class CommentsController : ControllerBase
{
    private readonly CommentService _commentService;
    private readonly UserService _userService;

    public CommentsController(CommentService commentService, UserService userService)
    {
        _commentService = commentService;
        _userService = userService;
    }

    [HttpPost]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> CreateComment([FromBody] CreateCommentRequest request)
    {
        var userName = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        try
        {
            User? user = await _userService.GetUser(userName!);
            Comment? createdComment = await _commentService.CreateComment(request.Content, request.EventId, user!.Id);
            if (createdComment != null)
                return Ok(new CommentResponse { Success = true, Message = "Comment created successfully", Comment = createdComment });
            return BadRequest(new CommentResponse { Success = false, Message = "Failed to create comment" });
        }
        catch (Exception ex)
        {
            return BadRequest(new CommentResponse { Success = false, Message = ex.Message });
        }
    }
}