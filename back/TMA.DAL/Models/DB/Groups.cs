using System;
using System.Collections.Generic;

namespace TMA.DAL.Models.DB
{
    public partial class Groups
    {
        public Groups()
        {
            UsersGroups = new HashSet<UsersGroups>();
        }

        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsDeleted { get; set; }

        public ICollection<UsersGroups> UsersGroups { get; set; }
    }
}
