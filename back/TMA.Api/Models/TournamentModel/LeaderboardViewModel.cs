namespace TMA.Api.Models
{
    public class LeaderboardViewModel
    {
        public UserModel User { get; set; }
        public int TotalScores { get; set; }
        public int NumberOfEvents { get; set; }
    }
}
