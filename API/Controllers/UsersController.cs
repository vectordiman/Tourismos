using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UsersController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return Ok(await _unitOfWork.UserRepository.GetUsersAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUserById(int id)
        {
            return Ok(await _unitOfWork.UserRepository.GetUserByIdAsync(id));
        }

        [HttpGet("expert")]
        public async Task<ActionResult<IEnumerable<ExpertDto>>> GetExperts()
        {
            var users = await _unitOfWork.UserRepository.GetExpertsAsync();
            var experts = _mapper.Map<IEnumerable<ExpertDto>>(users);
            return Ok(experts.ToArray());
        }
    }
}