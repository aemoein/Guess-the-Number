using GuessTheNumber.backend.Models;

namespace GuessTheNumber.backend.Services;

public interface IUserService
{
    Task<bool> RegisterAsync(string username, string password);
    Task<User?> LoginAsync(string username, string password);
    Task LogoutAsync();
    Task<int> StartNewGame(string username);
    Task<string> GuessNumber(string username, int guess);
    Task<int?> GetBestScoreAsync(string username);
}