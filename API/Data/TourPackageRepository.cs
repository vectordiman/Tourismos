using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace API.Data
{
    public class TourPackageRepository : ITourPackageRepository
    {
        private readonly DataContext _context;
        public TourPackageRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<TourPackage> CreatePackage(TourPackage package)
        {
            var entry = await _context.TourPackages.AddAsync(package);
            return entry.Entity;
        }

        public void DeletePackage(TourPackage package)
        {
            throw new NotImplementedException();
        }

        public async Task<TourPackage> GetTourPackage(int id)
        {
            return await _context.TourPackages
                .Include(p => p.Photos)
                .Include(exp => exp.Expert)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Photo>> GetTourPhotos(int id)
        {
            var package = await _context.TourPackages.Include(p => p.Photos).SingleOrDefaultAsync(x => x.Id == id);
            return package.Photos;
        }

        public async Task<IEnumerable<TourPackage>> GetTourPackagesAsync()
        {
            return await _context.TourPackages.Include(p => p.Photos).ToListAsync();
        }
        public async Task<IEnumerable<TourPackage>> GetHotTourPackagesAsync()
        {
            return await _context.TourPackages.Include(p => p.Photos).OrderByDescending(tp => tp.Start).Take(5).ToListAsync();
        }
        
        public void Update(TourPackage package)
        {
            _context.TourPackages.Update(package);
            //_context.Entry<TourPackage>(package).State = EntityState.Modified;
        }
    }
}