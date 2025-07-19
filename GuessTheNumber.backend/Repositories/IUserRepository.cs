using GuessTheNumber.backend.Models;

namespace GuessTheNumber.backend.Repositories;

public interface IUserRepository
{
    Task<User?> GetByUsernameAsync(string username);
    Task AddUserAsync(User user);
    Task<bool> UsernameExistsAsync(string username);
    Task<int?> GetBestScoreAsync(string username);
    Task UpdateBestScoreAsync(string username, int newScore);
}