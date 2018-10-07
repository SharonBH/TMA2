using System;
using System.Collections.Generic;

namespace TMA.DAL.Models.DB
{
    public partial class Tournaments
    {
        public Tournaments()
        {
            Events = new HashSet<Events>();
        }

        public int TournamentId { get; set; }
        public string TournamentName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public long? NumberOfEvents { get; set; }
        public bool IsDeleted { get; set; }

        public ICollection<Events> Events { get; set; }
    }
}
