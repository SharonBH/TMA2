using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using TMA.Api.Models;

namespace TMA.Api.Controllers
{
    [Serializable]
    public class GroupModel
    {
        public int GroupId { get; set; }

        [Required]
        public string GroupName { get; set; }

        [Required]
        public List<string> UserIds { get; set; }

        public List<UserModel> Users { get; set; }

    }
}