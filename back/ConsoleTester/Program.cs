﻿using System;
using System.Linq;
using TMA.BLL;
using TMA.DAL;

namespace ConsoleTester
{
    class Program
    {
        private static readonly MainRepositoryBLL _mainRepository = new MainRepositoryBLL();
        static void Main(string[] args)
        {

            int actualPlace = 2;
            int totalUsersInGame = 12;
            for (int x = totalUsersInGame; x < 22; x++)
            {


                for (int i = 1; i <= totalUsersInGame; i++)
                {
                    var points = calculate(i, x);
                    if (points>0) Console.WriteLine("Place: {1} | Points: {0:N2}", points, i);
                }
            }
            return;

            int tournid = 149,eventid = 1373;

            var e = _mainRepository.GetEventById(eventid);
            var t = _mainRepository.GetTournamentById(tournid);
            var results = _mainRepository.GetEventResult(eventid).Where(r=>r.Result.HasValue && r.Result.Value>0).ToList();
            _mainRepository.EditEvent(eventid, e.EventName, e.EventDate, t.TournamentName, results);

            //_mainRepository.CalculateScoreForEventId(159,1353);
			Console.ReadLine();
		}

		private static double calculate(int actualPlace, int totalUsersInGame)
		{
            //var placeResult = eventResult.Result;
            //var score = (float)(totalUserInEvent + 1) - placeResult + ((float)totalUserInEvent - (float)placeResult) / ((float)placeResult * (float)placeResult);

            var fourtyPer = (int)Math.Ceiling((float)totalUsersInGame * 0.4);
            var Score = actualPlace <= fourtyPer ? (float)(totalUsersInGame * 0.6) - actualPlace + ((float)totalUsersInGame - (float)actualPlace) /
                                ((float)actualPlace * (float)actualPlace) : 0;
            if (actualPlace ==1)  Console.WriteLine("players:{1}, prizes: {0}", fourtyPer, totalUsersInGame);
			//var Score = actualPlace <= fourtyPer ? (float)(totalUsersInGame * 0.6) - actualPlace + ((float)totalUsersInGame - (float)actualPlace) /
			//					((float)actualPlace * (float)actualPlace) : 0;
			return Score;
		}

		private void calc(int tournid, int eventid)
		{
            //_mainRepository.EditEvent(eventModel.EventId, eventModel.EventName, eventModel.EventDate, eventModel.TournamentName, eventModel.EventResults);

            //_mainRepository.CalculateScoreForEventId(tournid, eventid);
        }
	}
}
