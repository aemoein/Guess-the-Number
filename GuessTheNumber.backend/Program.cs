using GuessTheNumber.backend.Data;
using GuessTheNumber.backend.Repositories;
using GuessTheNumber.backend.Services;
using GuessTheNumber.backend.Middleware;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IJwtService, JwtService>();

builder.Services.AddControllers();

// JWT Authentication Configuration
var jwtSecretKey = builder.Configuration["Jwt:SecretKey"] ?? "DefaultSecretKeyThatIsAtLeast256BitsLongForHS256Algorithm";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "GuessTheNumberAPI";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "GuessTheNumberClient";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecretKey)),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddHttpContextAccessor();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        var allowedOrigins = new List<string>
        {
            "http://localhost:3000",
            "https://localhost:3000",
            "https://guess-the-number-tau-ten.vercel.app"
        };
        
        // Add any additional origins from environment variable
        var additionalOrigins = builder.Configuration.GetValue<string>("AllowedOrigins");
        if (!string.IsNullOrEmpty(additionalOrigins))
        {
            allowedOrigins.AddRange(additionalOrigins.Split(','));
        }
        
        policy
            .WithOrigins(allowedOrigins.ToArray())
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<RequestLoggingMiddleware>();
app.UseMiddleware<ErrorLoggingMiddleware>();
app.UseMiddleware<JWTMiddleware>();

app.UseHttpsRedirection();

app.UseCors("FrontendPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
