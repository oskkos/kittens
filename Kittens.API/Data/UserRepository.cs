using System;
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

		public async Task<Like> GetLike(int userId, int recipientId)
		{
			return await _context.Likes.FirstOrDefaultAsync(l => l.LikerId == userId && l.LikeeId == recipientId);
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
			var users = _context.Users.Include(p => p.Photos).OrderByDescending(u => u.LastActive).AsQueryable();
			users = users.Where(u => u.Id != userParams.UserId);
			users = users.Where(u => u.Gender == userParams.Gender);
			if (userParams.MinAge != 0 || userParams.MaxAge != 99) {
				var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
				var maxDob = DateTime.Today.AddYears(-userParams.MinAge);
				users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
			}
			if (!string.IsNullOrEmpty(userParams.OrderBy))
			{
				switch (userParams.OrderBy)
				{
					case "created":
						users = users.OrderByDescending(u => u.Created);
						break;
					case "lastActive":
						users = users.OrderByDescending(u => u.LastActive);
						break;
					default:
						throw new Exception($"Unexpected order by column: {userParams.OrderBy}");
				}
			}
			return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
		}

		public async Task<bool> SaveAll()
		{
			return await _context.SaveChangesAsync() > 0;
		}
	}
}
