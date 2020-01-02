using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Kittens.API.Data;
using Kittens.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Kittens.API.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class UsersController : ControllerBase
	{
		private readonly IUserRepository _repository;
		private readonly IMapper _mapper;
		public UsersController(IUserRepository repository, IMapper mapper)
		{
			this._mapper = mapper;
			this._repository = repository;

		}

		[HttpGet]
		public async Task<IActionResult> GetUsers()
		{
			var users = await _repository.GetUsers();
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
			return Ok(usersToReturn);
		}

		[HttpGet("{id}", Name = "GetUser")]
		public async Task<IActionResult> GetUser(int id)
		{
			var user = await _repository.GetUser(id);
            var userToReturn = _mapper.Map<UserForDetailedDto>(user);
			return Ok(userToReturn);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto dto)
		{
			if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
				return Unauthorized();
			}
			var userFromRepo = await _repository.GetUser(id);
			_mapper.Map(dto, userFromRepo);
			if (await _repository.SaveAll()) {
				return NoContent();
			}
			throw new Exception($"Updating user {id} failed on save");
		}
	}
}
