using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Kittens.API.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Kittens.API.Helpers
{
	public class LogUserActivity : IAsyncActionFilter
	{
		public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
		{
			var ctx = await next();
            var userId = int.Parse(ctx.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var repo = ctx.HttpContext.RequestServices.GetService<IUserRepository>();
            var user = await repo.GetUser(userId);
            user.LastActive = DateTime.Now;
            await repo.SaveAll();
		}
	}
}
