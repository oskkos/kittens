using System.ComponentModel.DataAnnotations;

namespace Kittens.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username {get; set;}
        
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Specify password between 4-8 chars long")]
        public string Password {get; set;}
    }
}
