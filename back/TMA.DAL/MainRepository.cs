using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using TMA.DAL.Models;
using TMA.DAL.Models.DB;

namespace TMA.DAL
{
    public class MainRepository
    {
        #region Events

        public void CreateEvent(string eventName, LkpEvent eventType, DateTime eventDate, int? tournamentId)
        {
            try
            {

                using (var context = new TMAContext())
                {
                    var isEventExisting = context.Events.Any(e => e.EventName == eventName && e.IsDeleted == false);
                    if(isEventExisting)
                        throw new Exception($"There is an existing '{eventName}' event.");

                    var newEvent = new Events
                    {
                        EventName = eventName,
                        EventTypeId = eventType.EventTypeId,
                        EventDate = eventDate,
                        TournamentId = tournamentId
                    };

                    context.Events.Add(newEvent);
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'CreateEvent'.", ex);
            }
        }

        public void EditEvent(int eventId, string eventName, LkpEvent eventType, DateTime eventDate, int? tournamentId)
        {
            try
            {
                using (var context = new TMAContext())
                {
                    var getEvent = context.Events.FirstOrDefault(e => e.EventId == eventId);

                    if (getEvent == null)
                        throw new Exception($"Event for EventId [{eventId}] was not found.");

                    if (getEvent.EventName.ToLower() != eventName.ToLower())
                        getEvent.EventName = eventName;

                    if (getEvent.EventTypeId != eventType.EventTypeId)
                        getEvent.EventTypeId = eventType.EventTypeId;

                    if (getEvent.TournamentId != tournamentId)
                        getEvent.TournamentId = tournamentId;

                    //getEvent.EventDate = eventDate; //TODO: check if we need to change the date.
                    context.Events.Update(getEvent);
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'EditEvent'.", ex);
            }
        }

        public void DeleteEvent(int eventId)
        {
            try
            {
                using (var context = new TMAContext())
                {
                    var getEvent = context.Events.FirstOrDefault(e => e.EventId == eventId);
                    if (getEvent == null)
                        throw new Exception($"Event for EventId [{eventId}] was not found.");
                    getEvent.IsDeleted = true;
                    context.Events.Update(getEvent);
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'DeleteEvent'.", ex);
            }
        }

        public Events GetEventByName(string eventName)
        {
            try
            {
                using (var context = new TMAContext())
                {
                    var getEvent = context.Events.FirstOrDefault(e => e.EventName == eventName && e.IsDeleted == false);
                    if (getEvent == null)
                        throw new Exception($"Event for EventName [{eventName}] was not found.");
                    return getEvent;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'GetEventByName'.", ex);
            }
        }

        public Events GetEventById(int eventId)
        {
            try
            {
                using (var context = new TMAContext())
                {
                    var getEvent = context.Events.FirstOrDefault(e => e.EventId == eventId);
                    if (getEvent == null)
                        throw new Exception($"Event for EventId [{eventId}] was not found.");
                    return getEvent;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'GetEventById'.", ex);
            }
        }

        public List<Events> GetEvents()
        {
            try
            {
                using (var context = new TMAContext())
                {
                    var events = context.Events
                        .Include(x => x.EventResults)
                        .Where(e => e.IsDeleted == false)
                        .ToList();
                    return events;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'GetEvents'.", ex);
            }
        }

        #endregion

        #region Tournaments

        public void CreateTournament(string tournamentName, DateTime startDate, DateTime endDate, int? numberOfEvents)
        {
            try
            {
                using (var context = new TMAContext())
                {

                    var isTournamentExisting = context.Tournaments.Any(t => t.TournamentName == tournamentName && t.IsDeleted == false);
                    if (isTournamentExisting)
                        throw new Exception($"There is an existing '{tournamentName}' tournament.");

                    var tournament = new Tournaments
                    {
                        TournamentName = tournamentName,
                        StartDate = startDate,
                        EndDate = endDate,
                        NumberOfEvents = numberOfEvents
                    };
                    context.Tournaments.Add(tournament);
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'CreateTournament'.", ex);
            }
        }

        public void EditTournament(int tournamentId, string tournamentName, DateTime startDate, DateTime endDate, int? numberOfEvents)
        {
            try
            {
                using (var context = new TMAContext())
                {
                    var tournament = context.Tournaments.FirstOrDefault(e => e.TournamentId == tournamentId);

                    if (tournament.TournamentName.ToLower() != tournamentName.ToLower())
                        tournament.TournamentName = tournamentName;

                    if (tournament.StartDate != startDate)
                        tournament.StartDate = startDate;

                    if (tournament.EndDate != endDate)
                        tournament.EndDate = endDate;

                    if (tournament.NumberOfEvents != numberOfEvents)
                        tournament.NumberOfEvents = numberOfEvents;

                    context.Tournaments.Update(tournament);
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'EditTournament'.", ex);
            }
        }

        public void DeleteTournament(int tournamentId)
        {
            try
            {
                using (var context = new TMAContext())
                {
                    var tournament = context.Tournaments.FirstOrDefault(e => e.TournamentId == tournamentId);
                    if (tournament == null)
                        throw new Exception($"Tournament for TournamentId [{tournamentId}] was not found.");
                    tournament.IsDeleted = true;
                    context.Tournaments.Update(tournament);
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'DeleteTournament'.", ex);
            }
        }

        public Tournaments GetTournamentByName(string tournamentName)
        {
            try
            {
                using (var context = new TMAContext())
                {
                    var tournament = context.Tournaments.FirstOrDefault(e => e.TournamentName == tournamentName && e.IsDeleted == false);
                    return tournament;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'GetTournamentByName'.", ex);
            }
        }

        public Tournaments GetTournamentById(int tournamentId)
        {
            try
            {
                using (var context = new TMAContext())
                {
                    var tournament = context.Tournaments.FirstOrDefault(e => e.TournamentId == tournamentId);
                    if (tournament == null)
                        throw new Exception($"Tournament for TournamentId [{tournamentId}] was not found.");
                    return tournament;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'GetTournamentById'.", ex);
            }
        }

        public List<Tournaments> GetTournaments()
        {
            try
            {
                using (var context = new TMAContext())
                {
                    var tournaments = context.Tournaments
                        .Include(x=> x.Events)
                        .Where(e => e.IsDeleted == false)
                        .ToList();
                    foreach (var tournament in tournaments)
                    {
                        foreach (var tournamentEvent in tournament.Events)
                        {
                            tournamentEvent.EventResults = context.EventResults.Where(x => x.EventId == tournamentEvent.EventId).ToList();
                        }
                    }
                    return tournaments;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'GetTournaments'.", ex);
            }
        }

        #endregion

        #region EventTypes

        public List<LkpEvent> GetEventTypes()
        {
            try
            {
                using (var context = new TMAContext())
                {
                    var eventTypes = context.LkpEvent.ToList();
                    return eventTypes;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'GetEventTypes'.", ex);
            }
        }
        
        public LkpEvent GetEventTypeByName(string eventTypeName)
        {
            try
            {
                using (var context = new TMAContext())
                {
                    var eventType = context.LkpEvent.FirstOrDefault(et=>et.EventTypeName.ToLower() == eventTypeName);
                    if (eventType == null)
                        throw new Exception($"The EventType for EventTypeName [{eventTypeName}] was not found.");

                    return eventType;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'GetEventTypeByName'.", ex);
            }
        }

        public LkpEvent GetEventTypeById(int eventTypeId)
        {
            try
            {
                using (var context = new TMAContext())
                {
                    var eventType = context.LkpEvent.FirstOrDefault(et => et.EventTypeId == eventTypeId);
                    if (eventType == null)
                        throw new Exception($"The EventType for EventTypeName [{eventTypeId}] was not found.");
                    return eventType;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'GetEventTypeById'.", ex);
            }
        }


        #endregion
    }
}
