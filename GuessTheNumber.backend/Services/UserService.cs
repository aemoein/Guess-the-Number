using GuessTheNumber.backend.Models;
using GuessTheNumber.backend.DTOs;
using GuessTheNumber.backend.Repositories;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace GuessTheNumber.backend.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepo;
    private static readonly Dictionary<string, GameSession> _activeGames = new();

    public UserService(IUserRepository userRepo)
    {
        _userRepo = userRepo;
    }

    public async Task<bool> RegisterAsync(string username, string password)
    {
        if (await _userRepo.UsernameExistsAsync(username)) return false;

        var hashedPassword = HashPassword(password);

        var user = new User
        {
            Username = username,
            Password = hashedPassword
        };

        await _userRepo.AddUserAsync(user);
        return true;
    }

    public async Task<User?> LoginAsync(string username, string password)
    {
        var user = await _userRepo.GetByUsernameAsync(username);
        if (user == null || !VerifyPassword(password, user.Password))
            return null;

        return user;
    }

    public Task<GameSession> StartNewGame(string username)
    {
        var random = new Random();
        int targetNumber = random.Next(1, 44); // 1–43 inclusive
        var session = new GameSession
        {
            Target = targetNumber,
            Attempts = 0
        };
        
        _activeGames[username] = session;

        Console.WriteLine($"[StartNewGame] User: {username}, Target: {targetNumber}");
        return Task.FromResult(session);
    }
    
    public async Task<GuessResultDto> GuessNumber(string username, int guess)
    {
        if (!_activeGames.ContainsKey(username))
        {
            return new GuessResultDto
            {
                Guess = guess,
                Result = "error",
                Message = "No active game. Please start a new game.",
                Attempts = 0
            };
        }

        var session = _activeGames[username];
        session.Attempts++;

        var dto = new GuessResultDto
        {
            Guess = guess,
            Attempts = session.Attempts
        };

        if (guess == session.Target)
        {
            dto.Result = "correct";
            dto.Message = $"🎉 Correct! You guessed it in {session.Attempts} tries.";

            int? updatedBest = await _userRepo.UpdateBestScoreAsync(username, session.Attempts);
            dto.NewBestScore = updatedBest;

            _activeGames.Remove(username);
        }
        else if (guess < session.Target)
        {
            dto.Result = "higher";
            dto.Message = "🔼 Guess Higher.";
        }
        else
        {
            dto.Result = "lower";
            dto.Message = "🔽 Guess Lower.";
        }

        return dto;
    }

    public Task<int?> GetBestScoreAsync(string username)
    {
        return _userRepo.GetBestScoreAsync(username);
    }

    // ====== Password Hashing Utilities ======

    private string HashPassword(string password)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(128 / 8);
        string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));

        return $"{Convert.ToBase64String(salt)}.{hashed}";
    }

    private bool VerifyPassword(string password, string storedHash)
    {
        var parts = storedHash.Split('.');
        if (parts.Length != 2) return false;

        byte[] salt = Convert.FromBase64String(parts[0]);
        string expectedHash = parts[1];

        string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));

        return hashed == expectedHash;
    }
}