using System;
using System.ComponentModel.DataAnnotations;

namespace TMA.Api.Controllers
{
    [Serializable]
    public class EventModel
    {
        public int EventId { get; set; }

        [Required]
        public string EventName { get; set; }
        public string TournamentName { get; set; }
        public DateTime EventDate { get; set; }
    }
}