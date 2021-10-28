using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int, IdentityUserClaim<int>, IdentityUserRole<int>,
        IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Photo> Photos { get; set; }
        public DbSet<TourPackage> TourPackages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Message>()
                .HasOne(u => u.Recipient)
                .WithMany(m => m.MessagesReceived)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasOne(u => u.Sender)
                .WithMany(m => m.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);



            builder.Entity<Tour>()
                .HasOne(u => u.Tourist)
                .WithMany(m => m.Tours)
                .HasForeignKey(k => k.TouristId);

            builder.Entity<Tour>()
                .HasOne(u => u.TourPackage)
                .WithMany(m => m.Tours)
                .HasForeignKey(k => k.TourPackageId);


            
            // Naming intermediate entities.
            builder.Entity<AppUser>()
                .HasMany(u => u.Photos)
                .WithMany(p => p.Users)
                .UsingEntity(j => j.ToTable("AppUserPhotos"));

            builder.Entity<Service>()
                .HasMany(s => s.Photos)
                .WithMany(p => p.Services)
                .UsingEntity(j => j.ToTable("ServicePhotos"));

            builder.Entity<TourPackage>()
                .HasMany(tp => tp.Services)
                .WithMany(s => s.TourPackages)
                .UsingEntity(j => j.ToTable("TourPackageServices"));

            builder.Entity<TourPackage>()
                .HasMany(tp => tp.Photos)
                .WithMany(p => p.TourPackages)
                .UsingEntity(j => j.ToTable("TourPackagePhotos"));

            builder.Entity<TourPackage>()
                .HasMany(tp => tp.Messages)
                .WithMany(msg => msg.TourPackages)
                .UsingEntity(j => j.ToTable("TourPackageMessages"));

            builder.Entity<Tour>()
                .HasMany(t => t.Services)
                .WithMany(s => s.Tours)
                .UsingEntity(j => j.ToTable("TourServices"));  
            
        }
    }
}