using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces
{
    public interface ITourPackageRepository
    {
        Task<TourPackage> CreatePackage(TourPackage package);

        void Update(TourPackage package);

        void DeletePackage(TourPackage package);

        Task<PagedList<TripDto>> GetTourPackagesAsync(PaginationParams paginationParams);
        Task<IEnumerable<TourPackage>> GetHotTourPackagesAsync();

        Task<TourPackage> GetTourPackage(int id);

        Task<IEnumerable<Photo>> GetTourPhotos(int id);
    }
}