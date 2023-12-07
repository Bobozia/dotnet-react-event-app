using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Models
{
    [Table("Users")]
    public class User : IdentityUser
    {
    }
}