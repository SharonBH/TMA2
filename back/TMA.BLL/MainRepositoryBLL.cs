using System;
using System.Collections.Generic;
using TMA.DAL;
using TMA.DAL.Models.DB;
using System.Linq;

namespace TMA.BLL
{
    public class MainRepositoryBLL
    {
        private readonly MainRepository _mainRepository = new MainRepository();

        #region Events

        public void CreateEvent(string eventName, DateTime eventDate, string tournamentName, List<EventResults> eventResults)
        {
            var tournament = _mainRepository.GetTournamentByName(tournamentName);
            var tournamentId = tournament?.TournamentId;
            _mainRepository.CreateEvent(eventName, eventDate, tournamentId, eventResults);
        }

        public void EditEvent(int eventId, string eventName, DateTime eventDate, string tournamentName, List<EventResults> eventResults)
        {
            var tournament = _mainRepository.GetTournamentByName(tournamentName);
            var tournamentId = tournament?.TournamentId;
            _mainRepository.EditEvent(eventId, eventName, eventDate, tournamentId, eventResults);
        }

        public void DeleteEvent(int eventId)
        {
            _mainRepository.DeleteEvent(eventId);
        }

        public Events GetEventByName(string eventName)
        {
            var getEvent = _mainRepository.GetEventByName(eventName);
            return getEvent;
        }

        public Events GetEventById(int eventId)
        {
            var getEvent = _mainRepository.GetEventById(eventId);
            return getEvent;
        }

        public List<Events> GetEvents()
        {
            var getEvents = _mainRepository.GetEvents();
            return getEvents;
        }

        #endregion

        #region Tournaments

        public int CreateTournament(string tournamentName, string eventTypeName, DateTime? startDate, DateTime? endDate, int? numberOfEvents, int groupId, string tournamentTypeName)
        {
            var tournamentTypeId = String.IsNullOrEmpty(tournamentTypeName) ? (int)DAL.Models.TournamentType.unknown : (int)(DAL.Models.TournamentType)Enum.Parse(typeof(DAL.Models.TournamentType), tournamentTypeName.ToLower());
            var eventType = _mainRepository.GetEventTypeByName(eventTypeName);
            var tournamentId = _mainRepository.CreateTournament(tournamentName, eventType, startDate, endDate, numberOfEvents, groupId, tournamentTypeId);
            return tournamentId;
        }

        public void EditTournament(int tournamentId, string tournamentName, string eventTypeName, DateTime? startDate, DateTime? endDate, int? numberOfEvents, int groupId, string tournamentTypeName, string termsAndConditions)
        {
            var tournamentTypeId = String.IsNullOrEmpty(tournamentTypeName) ? (int)DAL.Models.TournamentType.unknown : (int)(DAL.Models.TournamentType)Enum.Parse(typeof(DAL.Models.TournamentType), tournamentTypeName.ToLower());
            var eventType = _mainRepository.GetEventTypeByName(eventTypeName);
            _mainRepository.EditTournament(tournamentId, tournamentName, eventType, startDate, endDate, numberOfEvents, groupId, tournamentTypeId, termsAndConditions);
        }

        public void DeleteTournament(int tournamentId)
        {
            _mainRepository.DeleteTournament(tournamentId);
        }

        public Tournaments GetTournamentByName(string tournamentName)
        {
            var tournament = _mainRepository.GetTournamentByName(tournamentName);
            return tournament;
        }

        public Tournaments GetTournamentById(int tournamentId)
        {
            var tournament = _mainRepository.GetTournamentById(tournamentId);
            return tournament;

        }

        public List<Tournaments> GetTournaments()
        {
            var tournaments = _mainRepository.GetTournaments();
            return tournaments;

        }

        public List<LeaderboardModel> GetLeaderboards(int tournamentId)
        {
            var leaderboards = _mainRepository.GetLeaderboards(tournamentId);
            return leaderboards;
        }

        public void PresetEvents(int tournamentId, DateTime? statdate, DateTime? endDate, long? maxEvents, DAL.Models.Duration duration)
        {
            List<Events> events = new List<Events>();
            DateTime currentDate;
            if(statdate == null || statdate < DateTime.Now.Date)
            {
                currentDate = DateTime.Now.Date;
            }
            else
            {
                currentDate = (DateTime)statdate;
            }

            if(endDate == null)
            {
                endDate = statdate == null ? currentDate.AddYears(1) : ((DateTime)statdate).AddYears(1);
            }

            var tournament = GetTournamentById(tournamentId);
            
            var eventUsers = GetGroupById(tournament.GroupId).UsersGroups.Select(g => new EventResults()
            {
                UserId = g.UserId
            }).ToList();

            while (currentDate <= endDate && (maxEvents == null || maxEvents > 0))
            {
                var eventItem = new Events()
                {
                    EventDate = currentDate,
                    EventName = $"{currentDate.ToString("yyyy-MM-dd")} Poker game",
                    TournamentId = tournamentId
                };
                events.Add(eventItem);

                maxEvents--;
                switch (duration)
                {
                    case DAL.Models.Duration.daly:
                        currentDate = currentDate.AddDays(1);
                        break;
                    case DAL.Models.Duration.weekly:
                        currentDate = currentDate.AddDays(7);
                        break;
                    case DAL.Models.Duration.monthly:
                        currentDate = currentDate.AddMonths(1);
                        break;
                }
            }
            _mainRepository.PresetPokerEvents(tournamentId, events, eventUsers);
        }

        #endregion

        #region EventTypes

        public List<LkpEvent> GetEventTypes()
        {
            return _mainRepository.GetEventTypes();
        }

        public LkpEvent GetEventTypeByName(string eventTypeName)
        {
            return _mainRepository.GetEventTypeByName(eventTypeName);
        }
        public LkpEvent GetEventTypeById(int eventTypeId)
        {
            return _mainRepository.GetEventTypeById(eventTypeId);
        }

        #endregion

        #region Groups

        public void CreateGroup(string groupName, List<string> userIds)
        {
            _mainRepository.CreateGroup(groupName, userIds);
        }

        public void EditGroup(int groupId, string groupName, List<string> userIds)
        {
            _mainRepository.EditGroup(groupId, groupName, userIds);
        }

        public void DeleteGroup(int groupID)
        {
            _mainRepository.DeleteGroup(groupID);
        }

        public Groups GetGroupByName(string groupName)
        {
            var group = _mainRepository.GetGroupByName(groupName);
            return group;
        }

        public Groups GetGroupById(int groupId)
        {
            var group = _mainRepository.GetGroupById(groupId);
            return group;
        }

        public List<Groups> GetGroups()
        {
            var groups = _mainRepository.GetGroups();
            return groups;
        }

        public List<Events> GetEventsByTournamentId(int tournamentId)
        {
            var getEvents = _mainRepository.GetEventsByTournamentId(tournamentId);
            return getEvents;
        }

        public List<Events> GetEventsByUserId(string userId)
        {
            var eventsByUserId = _mainRepository.GetEventsByUserId(userId);
            return eventsByUserId;
        }

        public List<Groups> GetUserGroups(string userId)
        {
            var userGroups = _mainRepository.GetUserGroups(userId);
            return userGroups;
        }


        public List<Tournaments> GetUserTournaments(string userId)
        {
            var userTournaments = _mainRepository.GetUserTournaments(userId);
            return userTournaments;
        }

        public bool AddUserToGroup(string userId, int? groupId)
        {
            var result = _mainRepository.AddUserToGroup(userId, (int)groupId);
            return result;
        }


        #endregion
        public List<AspNetRoles> GetUserRoles()
        {
            var userRoles = _mainRepository.GetUserRoles();
            return userRoles;
        }

        public void RemoveUserFromGroups(string userId)
        {
            _mainRepository.RemoveUserFromGroups(userId);
        }

        public List<HomeLeaderboardModel> GetHomeLeaderboards(string userId)
        {
            var homeLeaderboards = _mainRepository.GetHomeLeaderboards(userId);
            return homeLeaderboards;
        }

        public Dictionary<string,Events> GetHomeEvents(string userId)
        {
            var homeEvents = _mainRepository.GetHomeEvents(userId);
            return homeEvents;
        }

        public void InsertUserAvatar(string username, byte[] avatar)
        {
            _mainRepository.InsertUserAvatar(username, avatar);
        }

        public byte[] GetUserAvatar(string username)
        {
            var userAvatar = _mainRepository.GetUserAvatar(username);
            return userAvatar;
        }

        public void CreateTournamentPresets(int tournamentId, string tournamentTypeName, int numberOfPresets = 1, DAL.Models.Duration duration = DAL.Models.Duration.unknown)
        {
            var tournament = GetTournamentById(tournamentId);
            if (string.IsNullOrEmpty(tournamentTypeName))
            {
                tournamentTypeName = ((DAL.Models.TournamentType)tournament.TournamentTypeId).ToString();
            }

            switch (tournament.EventTypeId)
            {
                case (int)DAL.Models.EventType.Poker:
                    PresetEvents(tournamentId, tournament.StartDate, tournament.EndDate, tournament.NumberOfEvents ,duration);
                    break;
                case (int)DAL.Models.EventType.Fifa:
                    LkpTournamentType tournametType = _mainRepository.GetTournamentTypeByName(tournamentTypeName);
                    _mainRepository.CreateTournamentPresets(tournamentId, tournametType, numberOfPresets);
                    break;
            }  
        }
    }
}
