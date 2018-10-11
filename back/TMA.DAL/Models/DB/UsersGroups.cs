using System;
using System.Collections.Generic;

namespace TMA.DAL.Models.DB
{
    public partial class UsersGroups
    {
        public int GroupId { get; set; }
        public string UserId { get; set; }

        public Groups Group { get; set; }
        public AspNetUsers User { get; set; }
    }
}
