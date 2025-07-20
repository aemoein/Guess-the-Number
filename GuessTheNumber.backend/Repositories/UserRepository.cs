using GuessTheNumber.backend.Data;
using GuessTheNumber.backend.Models;
using Microsoft.EntityFrameworkCore;

namespace GuessTheNumber.backend.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByUsernameAsync(string username)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
    }

    public async Task<bool> UsernameExistsAsync(string username)
    {
        return await _context.Users.AnyAsync(u => u.Username == username);
    }

    public async Task AddUserAsync(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
    }

    public async Task<int?> GetBestScoreAsync(string username)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        return user?.BestScore;
    }

    public async Task<int?> UpdateBestScoreAsync(string username, int newScore)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        if (user == null) return null;

        if (user.BestScore == null || newScore < user.BestScore)
        {
            user.BestScore = newScore;
            await _context.SaveChangesAsync();
            return user.BestScore;
        }

        return null; // No update was made
    }
}
