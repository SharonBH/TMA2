using System;
using TMA.DAL.Models.DB;

namespace TMA.DAL
{
    public class MainRepository
    {
        public void GetUsers()
        {
            var tmaContext = new TMAContext();
            var scores = tmaContext.Scores;
        }
    }
}
