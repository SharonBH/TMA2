using System;
using System.Collections.Generic;

namespace TMA.DAL.Models.DB
{
    public partial class LkpEvent
    {
        public LkpEvent()
        {
            Events = new HashSet<Events>();
        }

        public int EventTypeId { get; set; }
        public string EventTypeName { get; set; }

        public ICollection<Events> Events { get; set; }
    }
}
