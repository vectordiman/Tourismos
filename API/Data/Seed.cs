using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if(await userManager.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/Seeds/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            if(users == null) return;

            var roles = new List<AppRole>
            {
                new AppRole {Name = "Client"},
                new AppRole {Name = "Admin"},
                new AppRole {Name = "Expert"}
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
            
            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Client");
            }

            var admin = new AppUser
            {
                UserName = "admin"
            };

            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRoleAsync(admin, "Admin");
        }

        public static async Task SeedTourPackages(DataContext context)
        {
            if (await context.TourPackages.AnyAsync()) return;

            var packageData = await System.IO.File.ReadAllTextAsync("Data/Seeds/TourPackageSeedData.json");
            var packages = JsonSerializer.Deserialize<List<TourPackage>>(packageData);
            if (packages == null) return;

            foreach (var package in packages)
            {
                await context.TourPackages.AddAsync(package);
            }

            await context.SaveChangesAsync();

        }
    }
}