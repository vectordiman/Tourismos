using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Token { get; set; }
        public string PhotoUrl { get; set; }
        public int? PhotoId { get; set; }
        
        public string Role { get; set; }
    }
}