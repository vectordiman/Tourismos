using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace API.Entities
{
    [Table("Services")]
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