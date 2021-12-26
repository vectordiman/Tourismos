using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PopularQuestionsController: BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public PopularQuestionsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PopularQuestionDto>>> GetPopularQuestions()
        {
            var questions = await _unitOfWork.QuestionRepository.GetPopularQuestionsAsync();
            return Ok(_mapper.Map<IEnumerable<PopularQuestionDto>>(questions).ToArray());
        }
    }
}