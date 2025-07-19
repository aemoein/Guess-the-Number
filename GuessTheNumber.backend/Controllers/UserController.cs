using Microsoft.AspNetCore.Mvc;
using GuessTheNumber.backend.Services;
using GuessTheNumber.backend.DTOs;

namespace GuessTheNumber.backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IHttpContextAccessor _httpContext;

    public UserController(IUserService userService, IHttpContextAccessor httpContext)
    {
        _userService = userService;
        _httpContext = httpContext;
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
        return user != null ? Ok("✅ Login successful.") : Unauthorized("❌ Invalid credentials.");
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _userService.LogoutAsync();
        return Ok("👋 Logged out.");
    }

    [HttpPost("start")]
    public async Task<IActionResult> StartNewGame()
    {
        var username = _httpContext.HttpContext?.Session.GetString("User");
        if (string.IsNullOrEmpty(username)) return Unauthorized("User not logged in.");

        await _userService.StartNewGame(username);
        return Ok("🎲 New game started! Guess a number between 1 and 43.");
    }

    [HttpPost("guess/{number}")]
    public async Task<IActionResult> GuessNumber(int number)
    {
        var username = _httpContext.HttpContext?.Session.GetString("User");
        if (string.IsNullOrEmpty(username)) return Unauthorized("User not logged in.");

        var result = await _userService.GuessNumber(username, number);
        return Ok(result);
    }

    [HttpGet("bestscore")]
    public async Task<IActionResult> GetBestScore()
    {
        var username = _httpContext.HttpContext?.Session.GetString("User");
        if (string.IsNullOrEmpty(username)) return Unauthorized("User not logged in.");

        var best = await _userService.GetBestScoreAsync(username);
        return Ok(best == null
            ? "📭 No score yet. Start playing!"
            : $"🏆 Your best score is {best} guesses.");
    }
}