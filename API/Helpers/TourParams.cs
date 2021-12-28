using System;

namespace API.Helpers
{
    public class TourParams: PaginationParams
    {
        public DateTime Start { get; set; } = DateTime.Today;
        public DateTime End { get; set; } = DateTime.Today.AddDays(7);

        public string OrderBy { get; set; } = "price";
    }
}