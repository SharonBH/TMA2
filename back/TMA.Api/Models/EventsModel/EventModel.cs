using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using TMA.Api.Models;
using TMA.DAL.Models.DB;

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

        public List<EventResults> EventResults { get; set; }

        public List<UserModel> EventUsers { get; set; }

        public int TournamentTypeId { get; set; }

    }
}