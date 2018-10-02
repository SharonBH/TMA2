using System;
using System.Collections.Generic;

namespace TMA.DAL.Models.DB
{
    public partial class Scores
    {
        public int PlayerId { get; set; }
        public int EventId { get; set; }
        public int Score { get; set; }
    }
}
