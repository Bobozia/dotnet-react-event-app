
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Helpers
{
    public class JWTCreator
    {
        private readonly JWTSettings _jwtSettings;

        public JWTCreator(JWTSettings jwtSettings)
        {
            _jwtSettings = jwtSettings;
        }

        public string Generate(User user, List<string> roles)
        {
            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, user.UserName!),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(ClaimTypes.NameIdentifier, user.Id)
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _jwtSettings.Issuer,
                _jwtSettings.Audience,
                claims,
                expires: DateTime.Now.AddMinutes(_jwtSettings.DurationInMinutes),
                // expires: DateTime.Now.Add(_jwtSettings.Expires),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}