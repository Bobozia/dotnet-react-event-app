using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Models
{
    [Table("Users")]
    public class User : IdentityUser
    {
        public byte[] ProfilePicture { get; set; } = Array.Empty<byte>();
        public List<Event> Events { get; set; } = new();
        public List<Comment> Comments { get; set; } = new();
    }
}