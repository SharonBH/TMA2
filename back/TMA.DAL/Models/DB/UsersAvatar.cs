using System;
using System.Collections.Generic;

namespace TMA.DAL.Models.DB
{
    public partial class UsersAvatar
    {
        public string UserId { get; set; }
        public byte[] Avatar { get; set; }

        public AspNetUsers User { get; set; }
    }
}
