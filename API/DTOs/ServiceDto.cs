using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ServiceDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string PhotoUrl { get; set; }
        public string Description { get; set; }

        public IEnumerable<PhotoDto> Photos { get; set; }
        public IEnumerable<TripDto> Trips { get; set; }
    }
}