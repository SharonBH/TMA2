using System;
using System.Collections.Generic;

namespace TMA.DAL.Models.DB
{
    public partial class Events
    {
        public Events()
        {
            EventResults = new HashSet<EventResults>();
        }

        public int EventId { get; set; }
        public string EventName { get; set; }
        public int EventTypeId { get; set; }
        public int? TournamentId { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime EventDate { get; set; }

        public LkpEvent EventType { get; set; }
        public Tournaments Tournament { get; set; }
        public ICollection<EventResults> EventResults { get; set; }
    }
}
