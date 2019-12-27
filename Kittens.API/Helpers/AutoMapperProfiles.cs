using AutoMapper;
using Kittens.API.Dtos;
using Kittens.API.Models;

namespace Kittens.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>();
            CreateMap<User, UserForDetailedDto>();
        }
    }
}
