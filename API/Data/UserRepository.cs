using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users.Include(p => p.Photos).ToListAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.Include(p => p.Photos).Include(t => t.Tours).SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetExpertsAsync()
        {
            return await _context.Users.Include(p => p.Photos).Where(u => u.UserRoles.Single().Role.Name == "Expert").ToArrayAsync();
        }

        public async Task<UserDto> GetUserAsync(string username, bool isCurrentUser)
        {
            var query = _context.Users
                .Include(p => p.Photos)
                .Where(x => x.UserName == username)
                .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

            if (isCurrentUser)
                query = query.IgnoreQueryFilters();

            return await query.FirstOrDefaultAsync();
        }
        
        public async Task<IEnumerable<TourPackage>> GetTourPackages(int userId)
        {
            var tours = _context.TourPackages
                .Include(package => package.Tours)
                .SelectMany(tp => tp.Tours);
            var tourPackages = tours
                .Include(p => p.TourPackage)
                .Where(t => t.TouristId == userId)
                .Select(tp => tp.TourPackage);

            return await tourPackages.ToArrayAsync();
        }
    }
}
