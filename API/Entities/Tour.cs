using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Tours")]
    public class Tour
    {
        public int Id { get; set; }
        public AppUser Tourist { get; set; }
        public int TouristId { get; set; }
        public TourPackage TourPackage { get; set; }
        public int TourPackageId { get; set; }
        public DateTime PurchaseDate { get; set; }

        public ICollection<Service> Services { get; set; }
    }
}