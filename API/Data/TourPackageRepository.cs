using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class TourPackageRepository : ITourPackageRepository
    {
        private readonly DataContext _context;
        public TourPackageRepository(DataContext context)
        {
            _context = context;
        }

        public void DeletePackage(TourPackage package)
        {
            throw new NotImplementedException();
        }

        public async Task<TourPackage> GetTourPackage(int id)
        {
            return await _context.TourPackages
                .Include(p => p.Photos).SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<TourPackage>> GetTourPackagesAsync()
        {
            return await _context.TourPackages.Include(p => p.Photos).ToListAsync();
        }

        public void Update(TourPackage package)
        {
            throw new NotImplementedException();
        }
    }
}