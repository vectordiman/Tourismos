using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Service
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }

        public ICollection<Photo> Photos { get; set; }
        public ICollection<Tour> Tours { get; set; }
        public ICollection<TourPackage> TourPackages { get; set; }
    }
}