using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace API.Data
{
    public class TourPackageRepository : ITourPackageRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public TourPackageRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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

        public Task<PagedList<TourPackage>> GetTourPackagesAsync()
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

        public async Task<PagedList<TripDto>> GetTourPackagesAsync(TourParams tourParams)
        {
            var query = _context.TourPackages
                .Include(p => p.Photos)
                .AsQueryable();

            var start = tourParams.Start;
            var end = tourParams.End;

            query = query.Where(tp => tp.Start >= start && tp.End <= end);

            query = tourParams.OrderBy switch
            {
                "price" => query.OrderByDescending(u => u.Price),
                _ => query.OrderByDescending(u => u.Name)
            };

            return await PagedList<TripDto>.CreateAsync(
                query.ProjectTo<TripDto>(_mapper.ConfigurationProvider).AsNoTracking(), tourParams.PageNumber,
                tourParams.PageSize);
        }

        public async Task<IEnumerable<TourPackage>> GetHotTourPackagesAsync()
        {
            return await _context.TourPackages.Include(p => p.Photos).OrderByDescending(tp => tp.Start).Take(5)
                .ToListAsync();
        }

        public void Update(TourPackage package)
        {
            _context.TourPackages.Update(package);
            //_context.Entry<TourPackage>(package).State = EntityState.Modified;
        }
    }
}