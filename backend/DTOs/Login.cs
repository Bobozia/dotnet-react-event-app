using System.ComponentModel.DataAnnotations;

namespace DTOs
{
    public class LoginRequest
    {
        [Required]
        public string UserName { get; set; } = string.Empty;
        [Required, DataType(DataType.Password), MinLength(1)]
        public string Password { get; set; } = string.Empty;
    }

    public class LoginResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string Id { get; set; } = string.Empty;
    }
}