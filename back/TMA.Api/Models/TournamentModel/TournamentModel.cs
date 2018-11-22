using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TMA.Api.Controllers
{
    [Serializable]
    public class TournamentModel
    {
        public int TournamentId { get; set; }

        [Required]
        public string TournamentName { get; set; }
        public string EventTypeName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? NumberOfEvents { get; set; }
        [Required]
        public int GroupId { get; set; }
        public GroupModel GroupModel { get; set; }
        public List<EventModel> Events {get;set;}
        public int  EventsCount { get; set; }
        public string TournamentTypeName { get; set; }
        public int? NumberOfPresets { get; set; }
    }
}