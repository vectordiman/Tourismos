using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class TourPackage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }

        public ICollection<Tour> Tours;
        public ICollection<Service> Services;
        public ICollection<Photo> Photos;
        public ICollection<Message> Messages;
    }
}