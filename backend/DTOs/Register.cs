using System.ComponentModel.DataAnnotations;

namespace DTOs
{
    public class RegisterRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required, MinLength(4)]
        public string UserName { get; set; } = string.Empty;
        [Required, DataType(DataType.Password), MinLength(1)]
        public string Password { get; set; } = string.Empty;
        [Required, DataType(DataType.Password), MinLength(1), Compare(nameof(Password), ErrorMessage = "Passwords do not match")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }

    public class RegisterResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}