using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface ITourPackageRepository
    {
        void Update(TourPackage package);

        void DeletePackage(TourPackage package);

        Task<IEnumerable<TourPackage>> GetTourPackagesAsync();
    }
}