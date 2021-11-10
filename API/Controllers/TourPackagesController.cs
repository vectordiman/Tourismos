using System;
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
    public class TourPackagesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public TourPackagesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
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

        [HttpGet("{id}")]
        public async Task<ActionResult<TripDto>> GetTourPackage(int id)
        {
            var package = await _unitOfWork.TourPackageRepository.GetTourPackage(id);
            var trip = _mapper.Map<TripDto>(package);
            return Ok(trip);
        }

        [HttpPost()]
        public async Task<ActionResult<TripDto>> CreatePackage(TourPackage package)
        {
            var entity = await _unitOfWork.TourPackageRepository.CreatePackage(package);
            var trip = _mapper.Map<TripDto>(entity);
            return Ok(trip);
        }
    }
}