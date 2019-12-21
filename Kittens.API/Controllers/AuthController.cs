using System.Threading.Tasks;
using Kittens.API.Data;
using Kittens.API.DTOs;
using Kittens.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kittens.API.Controllers
{
    [Route("api/[controller]")]
	[ApiController]
    public class AuthController : ControllerBase
    {
		private readonly IAuthRepository _repo;

		public AuthController(IAuthRepository repo) {
			this._repo = repo;
		}

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            var username = userForRegisterDto.Username.ToLower();
            if (await _repo.UserExists(username)) {
                return BadRequest("Username already exists");
            }

            var userToCreate = new User {
                Username = username
            };
            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            // TODO: Return user
            return StatusCode(201);
        }
    }
}
