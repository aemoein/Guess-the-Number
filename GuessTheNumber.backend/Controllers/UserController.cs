using Microsoft.AspNetCore.Mvc;
using GuessTheNumber.backend.Services;
using GuessTheNumber.backend.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace GuessTheNumber.backend.Controllers;

[ApiController]
[Route("api")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IHttpContextAccessor _httpContext;
    private readonly IJwtService _jwtService;

    public UserController(IUserService userService, IHttpContextAccessor httpContext, IJwtService jwtService)
    {
        _userService = userService;
        _httpContext = httpContext;
        _jwtService = jwtService;
    }

    private string? GetUsernameFromContext()
    {
        return _httpContext.HttpContext?.Items["Username"]?.ToString();
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserDto userDto)
    {
        var success = await _userService.RegisterAsync(userDto.Username, userDto.Password);
        return success ? Ok("✅ Registration successful.") : BadRequest("❌ Username already exists.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserDto userDto)
    {
        var user = await _userService.LoginAsync(userDto.Username, userDto.Password);
        if (user != null)
        {
            var token = _jwtService.GenerateToken(user.Username, user.Id.ToString());

            var response = new LoginResponseDto
            {
                Token = token,
                Username = user.Username
            };

            return Ok(response);
        }

        return Unauthorized("❌ Invalid credentials.");
    }

    [Authorize]
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        return Ok("👋 Logged out. Please discard your token.");
    }

    [Authorize]
    [HttpPost("start")]
    public async Task<IActionResult> StartNewGame()
    {
        var username = GetUsernameFromContext();
        if (string.IsNullOrEmpty(username))
            return Unauthorized("User not found in token.");

        var gameState = await _userService.StartNewGame(username);

        return Ok(new {
            message = "🎲 New game started! Guess a number between 1 and 43.",
            attempts = gameState.Attempts
        });
    }


    [Authorize]
    [HttpPost("guess/{number}")]
    public async Task<IActionResult> GuessNumber(int number)
    {
        var username = GetUsernameFromContext();
        if (string.IsNullOrEmpty(username)) return Unauthorized("User not found in token.");

        var result = await _userService.GuessNumber(username, number);
        return Ok(result);
    }

    [Authorize]
    [HttpGet("bestscore")]
    public async Task<IActionResult> GetBestScore()
    {
        var username = GetUsernameFromContext();
        if (string.IsNullOrEmpty(username)) return Unauthorized("User not found in token.");

        var best = await _userService.GetBestScoreAsync(username);
        return Ok(best == null
            ? "📝 No score yet. Start playing!"
            : $"🏆 Your best score is {best} guesses.");
    }

    [HttpGet("test")]
    public IActionResult Test()
    {
        return Ok("✅ Backend is working.");
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        var username = GetUsernameFromContext();
        if (string.IsNullOrEmpty(username)) return Unauthorized();

        var best = await _userService.GetBestScoreAsync(username);
        var dto = new MeDTO
        {
            Username = username,
            BestScore = best ?? 0
        };

        return Ok(dto);
    }
}