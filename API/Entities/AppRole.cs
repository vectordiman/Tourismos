using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppRole : IdentityRole<int>
    {
        public ICollection<AppUser> Users { get; set; }
        
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}