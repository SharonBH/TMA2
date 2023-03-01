using System;

namespace ConsoleTester
{
    class Program
    {
        static void Main(string[] args)
        {

			//int actualPlace = 2;
			int totalUsersInGame = 12;
			for (int x = totalUsersInGame; x < 22; x++)
			{


				for (int i = 1; i <= totalUsersInGame; i++)
				{
					var points = calculate(i, x);
					Console.WriteLine("Place: {1} Points: {0}", points, i);
				}
			}
			Console.ReadLine();
		}

		private static double calculate(int actualPlace, int totalUsersInGame)
		{
			//var placeResult = eventResult.Result;
			//var score = (float)(totalUserInEvent + 1) - placeResult + ((float)totalUserInEvent - (float)placeResult) / ((float)placeResult * (float)placeResult);
			
			var fourtyPer = (int)Math.Ceiling((float)totalUsersInGame * 0.4);
			if (actualPlace ==1)  Console.WriteLine("players:{1}, prizes: {0}", fourtyPer, totalUsersInGame);
			var Score = actualPlace <= fourtyPer ? (float)(totalUsersInGame * 0.6) - actualPlace + ((float)totalUsersInGame - (float)actualPlace) /
								((float)actualPlace * (float)actualPlace) : 0;
			return Score;
		}
	}
}
