using System;
using System.Collections.Generic;
using System.Text;
using TMA.DAL.Models.DB;

namespace TMA.DAL
{
    public class LeaderboardModel
    {
        public AspNetUsers User { get; set; }
        public int TotalScores { get; set; }
        public int NumberOfEvents { get; set; }
    }
}
