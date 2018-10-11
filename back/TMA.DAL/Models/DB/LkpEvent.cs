using System;
using System.Collections.Generic;

namespace TMA.DAL.Models.DB
{
    public partial class LkpEvent
    {
        public LkpEvent()
        {
            Tournaments = new HashSet<Tournaments>();
        }

        public int EventTypeId { get; set; }
        public string EventTypeName { get; set; }

        public ICollection<Tournaments> Tournaments { get; set; }
    }
}
