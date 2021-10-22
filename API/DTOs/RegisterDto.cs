using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required] public string Username { get; set; }
        [Required] public string Name { get; set; }
        [Required] public string LastName { get; set; }
        [Required]
        [StringLength(64, MinimumLength = 4)]
        public string Password { get; set; }
    }
}