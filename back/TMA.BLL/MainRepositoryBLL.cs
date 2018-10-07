using System;
using System.Collections.Generic;
using TMA.DAL;
using TMA.DAL.Models.DB;

namespace TMA.BLL
{
    public class MainRepositoryBLL
    {
        private readonly MainRepository _mainRepository = new MainRepository();

        #region Events

        public void CreateEvent(string eventName, string eventTypeName, DateTime eventDate, string tournamentName)
        {
            var eventType = _mainRepository.GetEventTypeByName(eventTypeName);
            var tournament = _mainRepository.GetTournamentByName(tournamentName);
            var tournamentId = tournament?.TournamentId;
            _mainRepository.CreateEvent(eventName, eventType, eventDate, tournamentId);
        }

        public void EditEvent(int eventId, string eventName, string eventTypeName, DateTime eventDate, string tournamentName)
        {
            var eventType = _mainRepository.GetEventTypeByName(eventTypeName);
            var tournament = _mainRepository.GetTournamentByName(tournamentName);
            var tournamentId = tournament?.TournamentId;
            _mainRepository.EditEvent(eventId, eventName, eventType, eventDate, tournamentId);
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

        public void CreateTournament(string tournamentName, DateTime startDate, DateTime endDate, int? numberOfEvents)
        {
            _mainRepository.CreateTournament(tournamentName, startDate, endDate, numberOfEvents);
        }

        public void EditTournament(int tournamentId, string tournamentName, DateTime startDate, DateTime endDate, int? numberOfEvents)
        {
            _mainRepository.EditTournament(tournamentId, tournamentName, startDate, endDate, numberOfEvents);
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
    }
}
