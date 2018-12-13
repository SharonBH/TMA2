namespace TMA.Api.Models
{
    public class LeaderboardViewModel
    {
        public UserModel User { get; set; }
        public int TotalScores { get; set; }
        public int NumberOfEvents { get; set; }
        public int GoalsScored { get; set; }
        public int GoalsAgainst { get; set; }
        public int GoalsDifference => GoalsScored - GoalsAgainst;
        public int SuccessPercentage { get; set; }

    }
}
