namespace GuessTheNumber.backend.Data;

using Microsoft.EntityFrameworkCore;
using GuessTheNumber.backend.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
}