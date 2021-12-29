using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IServiceRepository
    {
        Task<IEnumerable<Service>> GetServices();
        Task<Service> GetService(int id);
        Task<Service> CreateService(Service service);
        Task<IEnumerable<Photo>> GetServicePhotos(int id);
    }
}