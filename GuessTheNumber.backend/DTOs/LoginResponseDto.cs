namespace GuessTheNumber.backend.DTOs;

public class LoginResponseDto
{
    public required string Token { get; set; }
    public required string Username { get; set; }
    public string Message { get; set; } = "✅ Login successful.";
}
