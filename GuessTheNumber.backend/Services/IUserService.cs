using GuessTheNumber.backend.Models;
using GuessTheNumber.backend.DTOs;

namespace GuessTheNumber.backend.Services
{
    public interface IUserService
    {
        Task<bool> RegisterAsync(string username, string password);
        Task<User?> LoginAsync(string username, string password);
        Task<int> StartNewGame(string username);
        Task<GuessResultDto> GuessNumber(string username, int guess);
        Task<int?> GetBestScoreAsync(string username);
    }
}