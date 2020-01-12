using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Kittens.API.Data;
using Kittens.API.Dtos;
using Kittens.API.Helpers;
using Kittens.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Kittens.API.Controllers
{
	[ServiceFilter(typeof(LogUserActivity))]
	[Authorize]
	[Route("api/users/{userId}/[controller]")]
	[ApiController]
	public class MessagesController : ControllerBase
	{
		private readonly IUserRepository _repository;
		private readonly IMapper _mapper;

		public MessagesController(IUserRepository repository, IMapper mapper)
		{
			this._repository = repository;
			this._mapper = mapper;
		}

        [HttpGet("{id}", Name = "GetMessage")]
        public async Task<IActionResult> GetMessage(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
				return Unauthorized();
			}
            var messageFromRepo = await _repository.GetMessage(id);
            if (messageFromRepo == null) {
                return NotFound();
            }
            return Ok(messageFromRepo);
        }
        [HttpGet]
        public async Task<IActionResult> GetMessagesForUser(int userId, [FromQuery]MessageParams messageParams)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
				return Unauthorized();
			}
            messageParams.UserId = userId;
            var messagesFromRepo = await _repository.GetMessagesForUser(messageParams);
            var messages = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);
            Response.AddPagination(messagesFromRepo.CurrentPage, messagesFromRepo.PageSize,
                messagesFromRepo.TotalCount, messagesFromRepo.TotalPages);
            return Ok(messages);
        }

        [HttpGet("thread/{recipientId}")]
        public async Task<IActionResult> GetMessageThread(int userId, int recipientId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
				return Unauthorized();
			}
            var messagesFromRepo = await _repository.GetMessageThread(userId, recipientId);
            var messageThread = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);
            return Ok(messageThread);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId, MessageForCreationDto msgDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
				return Unauthorized();
			}
            msgDto.SenderId = userId;
            var recipient = await _repository.GetUser(msgDto.RecipientId);
            if (recipient == null) {
                return BadRequest("No recipient found");
            }
            var msg = _mapper.Map<Message>(msgDto);
            _repository.Add(msg);
            if (await _repository.SaveAll()) {
                var messageFromRepo = await _repository.GetMessage(msg.Id);
                var messageToReturn = _mapper.Map<MessageToReturnDto>(messageFromRepo);
                return CreatedAtRoute("GetMessage", new {userId=userId, id=msg.Id}, messageToReturn);
            }
            throw new Exception("Create message failed");
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> DeleteMessage(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
				return Unauthorized();
			}
            var msgFromRepo = await _repository.GetMessage(id);
            if (msgFromRepo.SenderId == userId) {
                msgFromRepo.SenderDeleted = true;
            }
            if (msgFromRepo.RecipientId == userId) {
                msgFromRepo.RecipientDeleted = true;
            }
            if (msgFromRepo.SenderDeleted && msgFromRepo.RecipientDeleted) {
                _repository.Delete(msgFromRepo);
            }
            if (await _repository.SaveAll()) {
                return NoContent();
            }
            throw new Exception("Failed to delete message");
        }
        [HttpPost("{id}/read")]
        public async Task<IActionResult> MarkMessageAsRead(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
				return Unauthorized();
			}
            var msgFromRepo = await _repository.GetMessage(id);
            if (msgFromRepo.RecipientId != userId) {
                return Unauthorized();
            }
            msgFromRepo.IsRead = true;
            msgFromRepo.DateRead = DateTime.Now;
            if (await _repository.SaveAll()) {
                return NoContent();
            }
            throw new Exception("Failed to mark message as read");
        }
	}
}
