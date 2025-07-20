using GuessTheNumber.backend.Services;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace GuessTheNumber.backend.Middleware
{
    public class JWTMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IJwtService _jwtService;

        public JWTMiddleware(RequestDelegate next, IJwtService jwtService)
        {
            _next = next;
            _jwtService = jwtService;
        }

        public async Task Invoke(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            
            if (token != null)
            {
                var username = _jwtService.ValidateToken(token);
                if (username != null)
                {
                    // Add username to context for controllers to use
                    context.Items["Username"] = username;
                }
            }

            await _next(context);
        }
    }
}
