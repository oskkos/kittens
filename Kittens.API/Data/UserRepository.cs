using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kittens.API.Helpers;
using Kittens.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Kittens.API.Data
{
	public class UserRepository : IUserRepository
	{
		private readonly DataContext _context;
		public UserRepository(DataContext context)
        {
			this._context = context;
        }
		public void Add<T>(T entity) where T : class
		{
			_context.Add(entity);
		}

		public void Delete<T>(T entity) where T : class
		{
			_context.Remove(entity);
		}

		public async Task<Photo> GetMainPhotoForUser(int userId)
		{
			return await _context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMain);
		}

		public async Task<Photo> GetPhoto(int id)
		{
			return await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
		}

		public async Task<User> GetUser(int id)
		{
			return await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
		}

		public async Task<PagedList<User>> GetUsers(UserParams userParams)
		{
			var users = _context.Users.Include(p => p.Photos).AsQueryable();
			users = users.Where(u => u.Id != userParams.UserId);
			users = users.Where(u => u.Gender == userParams.Gender);
			return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
		}

		public async Task<bool> SaveAll()
		{
			return await _context.SaveChangesAsync() > 0;
		}
	}
}
