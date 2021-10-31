﻿using System.Linq;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDto, AppUser>();
            CreateMap<TourPackage, TripDto>()
            .ForMember(dest => dest.PhotoUrl,
                opt => opt.MapFrom(src => 
                    src.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}