using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TMA.Api.Controllers
{
    [Serializable]
    public class TournamentPresetsModel
    {
        [Required]
        public int TournamentId { get; set; }

        [Required]
        public string TournamentTypeName { get; set; }

        public int? NumberOfPresets { get; set; }

    }
}