using System;
using System.Collections.Generic;

namespace TMA.DAL.Models.DB
{
    public partial class Events
    {
        public int EventId { get; set; }
        public string EventName { get; set; }
        public int EventTypeId { get; set; }

        public LkpEvent EventType { get; set; }
    }
}
