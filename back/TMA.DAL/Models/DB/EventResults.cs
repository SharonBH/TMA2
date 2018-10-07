using System;
using System.Collections.Generic;

namespace TMA.DAL.Models.DB
{
    public partial class EventResults
    {
        public string UserId { get; set; }
        public int EventId { get; set; }
        public int Result { get; set; }

        public Events Event { get; set; }
        public AspNetUsers User { get; set; }
    }
}
