using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("TourPackages")]
    public class TourPackage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }

        public ICollection<Tour> Tours { get; set; }
        public ICollection<Service> Services { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<Message> Messages { get; set; }
    }
}