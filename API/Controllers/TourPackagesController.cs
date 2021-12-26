using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TourPackagesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public TourPackagesController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TripDto>>> GetTourPackages()
        {
            var packages = await _unitOfWork.TourPackageRepository.GetTourPackagesAsync();
            var trips = _mapper.Map<IEnumerable<TripDto>>(packages);
            return Ok(trips.ToArray());
        }
        
        [HttpGet("hot",Name = "GetHotTourPackages")]
        public async Task<ActionResult<IEnumerable<TripDto>>> GetHotTourPackages()
        {
            var packages = await _unitOfWork.TourPackageRepository.GetHotTourPackagesAsync();
            var trips = _mapper.Map<IEnumerable<TripDto>>(packages);
            return Ok(trips.ToArray());
        }

        [HttpGet("{id}", Name = "GetTourPackage")]
        public async Task<ActionResult<TripDto>> GetTourPackage(int id)
        {
            var package = await _unitOfWork.TourPackageRepository.GetTourPackage(id);
            var trip = _mapper.Map<TripDto>(package);
            return Ok(trip);
        }

        [HttpGet("photos/{tourId}")]
        public async Task<ActionResult<IEnumerable<PhotoDto>>> GetTourPhotos(int tourId)
        {
            var packagePhotos = await _unitOfWork.TourPackageRepository.GetTourPhotos(tourId);
            var photosDto = _mapper.Map<IEnumerable<PhotoDto>>(packagePhotos);
            return Ok(photosDto.ToArray());
        }

        [HttpPost()]
        public async Task<ActionResult<TripDto>> CreatePackage(TourPackage package)
        {
            var entity = await _unitOfWork.TourPackageRepository.CreatePackage(package);
            var trip = _mapper.Map<TripDto>(entity);
            return Ok(trip);
        }

        [HttpPost("add-photo/{tourId}")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(int tourId, IFormFile file)
        {
            var tourPackage = await _unitOfWork.TourPackageRepository.GetTourPackage(tourId);

            if (tourPackage == null) BadRequest("No tour package found");

            var result = await _photoService.AddPhotoAsync(file, PhotoType.TourPackage);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            tourPackage.Photos.Add(photo);

            if (await _unitOfWork.Complete())
            {
                return CreatedAtRoute("GetTourPackage", new { id = tourPackage.Id }, _mapper.Map<Photo, PhotoDto>(photo));
            }

            return BadRequest("Problem adding photo");
        }

        [HttpPut("{tourId}/set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int tourId, int photoId)
        {
            var tourPackage = await _unitOfWork.TourPackageRepository.GetTourPackage(tourId);
            var photo = tourPackage.Photos.FirstOrDefault(photo => photo.Id == photoId);

            if (photo.IsMain) return BadRequest("The photo is already main");

            var currentMain = tourPackage.Photos.FirstOrDefault(photo => photo.IsMain);
            if (currentMain != null) currentMain.IsMain = false;
            photo.IsMain = true;

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed setting main photo");
        }

        [HttpDelete("{tourId}/delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int tourId, int photoId)
        {
            var tourPackage = await _unitOfWork.TourPackageRepository.GetTourPackage(tourId);
            var photo = tourPackage.Photos.FirstOrDefault(p => p.Id == photoId);
            
            if (photo == null) return NotFound();
            if (photo.IsMain) return BadRequest("Cannot delete main photo");
            if (photo.PublicId != null)
            {
                var deletionResult = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (deletionResult.Error != null) return BadRequest(deletionResult.Error.Message);
            }

            tourPackage.Photos.Remove(photo);

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Cannot delete photo");
        }

        [HttpPut]
        public async Task<ActionResult> UpdatePackage(TripDto trip)
        {
            var package = _mapper.Map<TourPackage>(trip);
            var expert = await _unitOfWork.UserRepository.GetUserByUsernameAsync(package.Expert.UserName);
            package.Expert = expert;

            _unitOfWork.TourPackageRepository.Update(package);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest();
        }
    }
}