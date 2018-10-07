using System;
using System.ComponentModel.DataAnnotations;

namespace TMA.Api.Models.AccountViewModels
{
    [Serializable]
    public class LoginModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Username { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }
}
