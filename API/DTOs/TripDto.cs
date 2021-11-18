using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class TripDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }
        public string PhotoUrl { get; set; }
        public ExpertDto Expert { get; set; }

        public ICollection<Service> Services { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}