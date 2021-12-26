using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("PopularQuestions")]
    public class PopularQuestion
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}