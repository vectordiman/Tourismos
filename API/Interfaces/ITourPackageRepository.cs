using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces
{
    public interface ITourPackageRepository
    {
        Task<TourPackage> CreatePackage(TourPackage package);

        void Update(TourPackage package);

        void DeletePackage(TourPackage package);

        Task<IEnumerable<TourPackage>> GetTourPackagesAsync();

        Task<TourPackage> GetTourPackage(int id);

        Task<IEnumerable<Photo>> GetTourPhotos(int id);
    }
}