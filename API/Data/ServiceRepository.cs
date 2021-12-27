using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly DataContext _context;
        public ServiceRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Service> GetService(int id)
        {
            return await _context.Services.SingleOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Service>> GetServices()
        {
            return await _context.Services.Include(p => p.Photos).ToListAsync();
        }
    }
}