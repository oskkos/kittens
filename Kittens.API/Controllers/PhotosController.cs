using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Kittens.API.Data;
using Kittens.API.Dtos;
using Kittens.API.Helpers;
using Kittens.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Kittens.API.Controllers
{
	[Authorize]
	[Route("api/users/{userId}/photos")]
	public class PhotosController : ControllerBase
	{
		private readonly IMapper _mapper;
		private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
		private readonly IUserRepository _repository;
		private Cloudinary _cloudinary;

		public PhotosController(IUserRepository repository, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
		{
			this._cloudinaryConfig = cloudinaryConfig;
			this._mapper = mapper;
			this._repository = repository;
            this._cloudinary = new Cloudinary(new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret));
    	}

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repository.GetPhoto(id);
            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, PhotoForCreationDto photoDto)
        {
   			if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
				return Unauthorized();
			}
			var userFromRepo = await _repository.GetUser(userId);
            var file = photoDto.File;
            var uploadResult  = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
            photoDto.Url = uploadResult.Uri.ToString();
            photoDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoDto);
            if (!userFromRepo.Photos.Any(u => u.IsMain)) {
                photo.IsMain = true;
            }
            userFromRepo.Photos.Add(photo);
            if (await _repository.SaveAll())
            {
                return CreatedAtRoute("GetPhoto", new { id = photo.Id, userId = userId}, _mapper.Map<PhotoForReturnDto>(photo));
            }
            return BadRequest("Could not add the photo");
        }
	}
}
