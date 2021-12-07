﻿using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);

        Task<IEnumerable<AppUser>> GetUsersAsync();

        Task<AppUser> GetUserByIdAsync(int id);
        
        Task<AppUser> GetUserByUsernameAsync(string username);

        Task<IEnumerable<AppUser>> GetExpertsAsync();

        Task<UserDto> GetUserAsync(string username, bool isCurrentUser);

        Task<IEnumerable<TourPackage>> GetTourPackages(int userId);
    }
}
