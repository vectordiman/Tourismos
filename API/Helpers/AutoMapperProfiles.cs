using System.Linq;
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
            CreateMap<UserUpdateDto, AppUser>();
            CreateMap<Photo, PhotoDto>();
            CreateMap<AppUser, UserDto>()
                .ForMember(dest => dest.PhotoUrl,
                    opt => opt.MapFrom(src =>
                        src.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<UserDto, AppUser>();
            CreateMap<TourPackage, TripDto>()
                .ForMember(dest => dest.PhotoUrl,
                    opt => opt.MapFrom(src =>
                        src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Expert, opt => opt.MapFrom(src => src.Expert));

            CreateMap<TripDto, TourPackage>()
                .ForMember(dest => dest.Expert, opt => opt.MapFrom(src => src.Expert));

            CreateMap<Message, MessageDto>()
                .ForMember(dest => dest.SenderPhotoUrl,
                    opt => opt.MapFrom(
                        src => src.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.RecipientPhotoUrl,
                    opt => opt.MapFrom(
                        src => src.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<AppUser, ExpertDto>()
                .ForMember(dest => dest.PhotoUrl,
                    opt => opt.MapFrom(src =>
                        src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));

            CreateMap<ExpertDto, AppUser>();
        }
    }
}
