using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class QuestionsRepository : IQuestionRepository
    {
        private readonly DataContext _context;

        public QuestionsRepository(DataContext context)
        {
            _context = context;
        }
        
        public async Task<IEnumerable<PopularQuestion>> GetPopularQuestionsAsync()
        {
            return await _context.PopularQuestions.ToListAsync();
        }
    }
}