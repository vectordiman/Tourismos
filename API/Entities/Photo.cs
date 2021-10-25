using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }

        public ICollection<AppUser> Users { get; set; }
        public ICollection<TourPackage> TourPackages { get; set; }
        public ICollection<Service> Services { get; set; }
    }
}