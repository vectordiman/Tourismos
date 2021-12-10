using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.Services;
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
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = _mapper.Map<IEnumerable<UserDto>>(await _unitOfWork.UserRepository.GetUsersAsync());
            return Ok(users.ToArray());
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

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var result = await _photoService.AddPhotoAsync(file, PhotoType.User);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            user.Photos.Add(photo);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetUser", new {username = user.UserName}, _mapper.Map<Photo, PhotoDto>(photo));
            }

            return BadRequest("Problem adding photo");
        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("This is already your main photo");

            var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
            if (currentMain != null) currentMain.IsMain = false;
            photo.IsMain = true;

            if (await _unitOfWork.Complete())
                return NoContent();

            return BadRequest("Failed to set main photo");
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

        [HttpGet("expert")]
        public async Task<ActionResult<IEnumerable<ExpertDto>>> GetExperts()
        {
            var users = await _unitOfWork.UserRepository.GetExpertsAsync();
            var experts = _mapper.Map<IEnumerable<ExpertDto>>(users);
            return Ok(experts.ToArray());
        }
        
        [HttpGet("tour-packages")]
        public async Task<ActionResult<IEnumerable<TripDto>>> GetTourPackages()
        {
            var tourPackages = await _unitOfWork.UserRepository.GetTourPackages(User.GetUserId());
            return Ok(_mapper.Map<IEnumerable<TripDto>>(tourPackages).ToArray());
        }
        
        [HttpPost("add-tour/{tourId}")]
        public async Task<ActionResult> AddTour(int tourId)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var tourPackage = await _unitOfWork.TourPackageRepository.GetTourPackage(tourId);

            if (tourPackage == null) return NotFound();

            var tour = new Tour
            {
                Tourist = user,
                TouristId = user.Id,
                TourPackage = tourPackage,
                TourPackageId = tourPackage.Id,
                PurchaseDate = DateTime.Now,
                Services = tourPackage.Services
            };

            if (user.Tours.FirstOrDefault(t => t.TouristId == user.Id && t.TourPackageId == tourPackage.Id) != null)
                return BadRequest("This is already one of your favorite tours");
            
            user.Tours.Add(tour);

            if (await _unitOfWork.Complete())
            {
                return Ok();
            }

            return BadRequest("Problem adding tour");
        }
        
        [HttpDelete("delete-tour/{tourId}")]
        public async Task<ActionResult> DeleteTour(int tourId)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());

            var tour = user.Tours.FirstOrDefault(x => x.TourPackageId == tourId);

            if (tour == null) return NotFound();
            
            user.Tours.Remove(tour);

            if (await _unitOfWork.Complete())
            {
                return Ok();
            }

            return BadRequest("Problem deleting tour from user");
        }
        
        [HttpDelete("delete-all-tours")]
        public async Task<ActionResult> DeleteAllTours()
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            
            user.Tours.Clear();

            if (await _unitOfWork.Complete())
            {
                return Ok();
            }

            return BadRequest("Problem deleting all tours from user");
        }
    }
}
