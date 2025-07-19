using GuessTheNumber.backend.Models;
using GuessTheNumber.backend.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace GuessTheNumber.backend.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepo;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private static readonly Dictionary<string, GameSession> _activeGames = new();

    public UserService(IUserRepository userRepo, IHttpContextAccessor httpContextAccessor)
    {
        _userRepo = userRepo;
        _httpContextAccessor = httpContextAccessor;
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
        if (user == null) return null;

        if (!VerifyPassword(password, user.Password)) return null;

        _httpContextAccessor.HttpContext!.Session.SetString("User", username);
        return user;
    }

    public Task LogoutAsync()
    {
        _httpContextAccessor.HttpContext!.Session.Remove("User");
        return Task.CompletedTask;
    }

    public Task<int> StartNewGame(string username)
    {
        var random = new Random();
        int targetNumber = random.Next(1, 44); // 1–43 inclusive
        _activeGames[username] = new GameSession
        {
            Target = targetNumber,
            Attempts = 0
        };
        return Task.FromResult(targetNumber); // For dev only (can remove later)
    }

    public async Task<string> GuessNumber(string username, int guess)
    {
        if (!_activeGames.ContainsKey(username))
            return "No active game. Please start a new game.";

        var session = _activeGames[username];
        session.Attempts++;

        if (guess == session.Target)
        {
            await _userRepo.UpdateBestScoreAsync(username, session.Attempts);
            _activeGames.Remove(username);
            return $"🎉 Correct! You guessed it in {session.Attempts} tries.";
        }

        return guess < session.Target ? "🔼 Guess Higher." : "🔽 Guess Lower.";
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

    // ====== Game Session Class ======
    private class GameSession
    {
        public int Target { get; set; }
        public int Attempts { get; set; }
    }
}