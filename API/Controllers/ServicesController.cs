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
    public class ServicesController : BaseApiController
    {
        private IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ServicesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Service>>> GetServices()
        {
            var services = await _unitOfWork.ServiceRepository.GetServices();
            var servicesDto = _mapper.Map<IEnumerable<ServiceDto>>(services);
            return Ok(servicesDto.ToArray());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceDto>> GetService(int id)
        {
            var service = await _unitOfWork.ServiceRepository.GetService(id);
            var serviceDto = _mapper.Map<ServiceDto>(service);
            return Ok(serviceDto);
        }


        [HttpPost]
        public async Task<ActionResult<IEnumerable<Service>>> CreateService(Service service)
        {
            var result = await _unitOfWork.ServiceRepository.CreateService(service);
            if (await _unitOfWork.Complete()) return Ok(result);
            return BadRequest("Failed to create service");
        }

        [HttpGet("{serviceId}/photos")]
        public async Task<ActionResult<IEnumerable<Photo>>> GetServicePhotos(int serviceId)
        {
            var servicePhotos = await _unitOfWork.ServiceRepository.GetServicePhotos(serviceId);
            var photosDto = _mapper.Map<IEnumerable<PhotoDto>>(servicePhotos);
            return Ok(photosDto.ToArray());
        }
    }
}