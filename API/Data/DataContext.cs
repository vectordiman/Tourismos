using System;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Data
{
    public static class UtcDateAnnotation
    {
        private const String IsUtcAnnotation = "IsUtc";
        private static readonly ValueConverter<DateTime, DateTime> UtcConverter =
            new ValueConverter<DateTime, DateTime>(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

        private static readonly ValueConverter<DateTime?, DateTime?> UtcNullableConverter =
            new ValueConverter<DateTime?, DateTime?>(v => v, v => v == null ? v : DateTime.SpecifyKind(v.Value, DateTimeKind.Utc));

        public static PropertyBuilder<TProperty> IsUtc<TProperty>(this PropertyBuilder<TProperty> builder, Boolean isUtc = true) =>
            builder.HasAnnotation(IsUtcAnnotation, isUtc);

        public static Boolean IsUtc(this IMutableProperty property) =>
            ((Boolean?)property.FindAnnotation(IsUtcAnnotation)?.Value) ?? true;

        /// <summary>
        /// Make sure this is called after configuring all your entities.
        /// </summary>
        public static void ApplyUtcDateTimeConverter(this ModelBuilder builder)
        {
            foreach (var entityType in builder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    if (!property.IsUtc())
                    {
                        continue;
                    }

                    if (property.ClrType == typeof(DateTime))
                    {
                        property.SetValueConverter(UtcConverter);
                    }

                    if (property.ClrType == typeof(DateTime?))
                    {
                        property.SetValueConverter(UtcNullableConverter);
                    }
                }
            }
        }
    }
    public class DataContext : IdentityDbContext<AppUser, AppRole, int, IdentityUserClaim<int>, AppUserRole,
        IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Photo> Photos { get; set; }
        public DbSet<TourPackage> TourPackages { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Message> Messages { get; set; }

        public DbSet<PopularQuestion> PopularQuestions { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Connection> Connections { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                .HasMany(u => u.UserRoles)
                .WithOne(ur => ur.User)
                .HasForeignKey(k => k.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(r => r.UserRoles)
                .WithOne(ur => ur.Role)
                .HasForeignKey(k => k.RoleId)
                .IsRequired();

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



            builder.Entity<TourPackage>()
                .HasOne(u => u.Expert)
                .WithMany(m => m.SupervisedTourPackages);



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

            builder.ApplyUtcDateTimeConverter();
        }
    }
}