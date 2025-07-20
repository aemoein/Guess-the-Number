namespace GuessTheNumber.backend.Services;

public interface IJwtService
{
    string GenerateToken(string username, string userId);
    string? ValidateToken(string token);
}
