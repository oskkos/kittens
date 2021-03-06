using Kittens.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Kittens.API.Data
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
		public DbSet<Photo> Photos { get; set; }
		public DbSet<Like> Likes { get; set; }
		public DbSet<Message> Messages { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			builder.Entity<Like>()
				.HasKey(l => new {l.LikerId, l.LikeeId});

			builder.Entity<Like>()
				.HasOne(l => l.Likee)
				.WithMany(u => u.Likers)
				.HasForeignKey(l => l.LikeeId)
				.OnDelete(DeleteBehavior.Restrict);

			builder.Entity<Like>()
				.HasOne(l => l.Liker)
				.WithMany(u => u.Likees)
				.HasForeignKey(l => l.LikerId)
				.OnDelete(DeleteBehavior.Restrict);

			builder.Entity<Message>()
				.HasOne(u => u.Sender)
				.WithMany(m => m.MessagesSent)
				.HasForeignKey(m => m.SenderId)
				.OnDelete(DeleteBehavior.Restrict);

			builder.Entity<Message>()
				.HasOne(u => u.Recipient)
				.WithMany(m => m.MessagesReceived)
				.HasForeignKey(m => m.RecipientId)
				.OnDelete(DeleteBehavior.Restrict);
		}
	}
}
