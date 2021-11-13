using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController: BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public UsersController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = photoService;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return Ok(await _unitOfWork.UserRepository.GetUsersAsync());
        }

        [HttpGet("{username}", Name = "GetUser")]
        public async Task<ActionResult<UserDto>> GetUser(string username)
        {
            var isCurrentUser = User.GetUsername() == username;
            return await _unitOfWork.UserRepository.GetUserAsync(username, isCurrentUser);
        }
        
        [HttpPut]
        public async Task<ActionResult> UpdateUser(UserUpdateDto userUpdateDto)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            _mapper.Map(userUpdateDto, user);

            _unitOfWork.UserRepository.Update(user);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update user");
        }
        
        [HttpPost("add-main-photo")]
        public async Task<ActionResult<PhotoDto>> AddMainPhoto(IFormFile file)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                IsMain = true
            };
            
            user.Photos.Add(photo);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetUser", new {username = user.UserName}, _mapper.Map<Photo, PhotoDto>(photo));
            }

            return BadRequest("Problem adding photo");
        }
        
        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();
            
            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            user.Photos.Remove(photo);
            
            if (await _unitOfWork.Complete())
                return Ok();

            return BadRequest("Failed to delete photo");
        }
    }
}