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

        public void CreateEvent(string eventName, DateTime eventDate, int? tournamentId)
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

        public void EditEvent(int eventId, string eventName, DateTime eventDate, int? tournamentId)
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

        public object GetEventById(object eventId)
        {
            throw new NotImplementedException();
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

        public void CreateTournament(string tournamentName, LkpEvent eventType, DateTime? startDate, DateTime? endDate, int? numberOfEvents)
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
                        EventTypeId = eventType.EventTypeId,
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

        public void EditTournament(int tournamentId, string tournamentName, LkpEvent eventType, DateTime? startDate, DateTime? endDate, int? numberOfEvents)
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

                    if (tournament.EventTypeId != eventType.EventTypeId)
                        tournament.EventTypeId = eventType.EventTypeId;

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
                    var tournament = context.Tournaments
                        .Include(t => t.Events)
                        .FirstOrDefault(e => e.TournamentName == tournamentName && e.IsDeleted == false);
                    if (tournament == null)
                        throw new Exception($"Tournament for Tournament Name [{tournamentName}] was not found.");
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
                    var tournament = context.Tournaments
                        .Include(t=> t.Events)
                        .FirstOrDefault(e => e.TournamentId == tournamentId);
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
                        .Include(x=> x.Events).ThenInclude(t=> t.EventResults)
                        .Where(e => e.IsDeleted == false)
                        .ToList();
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

        #region Groups

        public void CreateGroup(string groupName, List<string> userIds)
        {
            try
            {
                using (var context = new TMAContext())
                {
                    var isGroupExisting = context.Groups.Any(e => e.GroupName.ToLower() == groupName.ToLower() && e.IsDeleted == false);
                    if (isGroupExisting)
                        throw new Exception($"There is an existing '{groupName}' group.");

                    var newGroup = new Groups
                    {
                        GroupName = groupName
                    };

                    context.Groups.Add(newGroup);
                    context.SaveChanges();

                    var createdGroup = context.Groups.FirstOrDefault(g => g.GroupName.ToLower() == groupName.ToLower());
                    if(createdGroup == null)
                        throw new Exception($"An error occuored creating new group");

                    var groupId = createdGroup.GroupId;
                    var usersGroups = new List<UsersGroups>();
                    foreach (var userId in userIds)
                    {
                        var userGroup = new UsersGroups
                        {
                            UserId = userId,
                            GroupId = groupId
                        };
                        usersGroups.Add(userGroup);
                    }
                    context.UsersGroups.AddRange(usersGroups);
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'CreateGroup'.", ex);
            }
        }

        public void EditGroup(int groupId, string groupName, List<string> userIds)
        {
            try
            {
                using (var context = new TMAContext())
                {
                    var group = context.Groups.Include(x=> x.UsersGroups).FirstOrDefault(e => e.GroupId== groupId);

                    if (group == null)
                        throw new Exception($"Group for groupId [{groupId}] was not found.");

                    if (group.GroupName.ToLower() != groupName.ToLower())
                        group.GroupName = groupName;

                    var usersGroups = new List<UsersGroups>();
                    foreach (var userId in userIds)
                    {
                        var userGroup = new UsersGroups
                        {
                            UserId = userId,
                            GroupId = groupId
                        };
                        usersGroups.Add(userGroup);
                    }

                    if (group.UsersGroups != usersGroups)
                    {
                        context.UsersGroups.RemoveRange(group.UsersGroups);
                        context.SaveChanges();
                        group.UsersGroups = usersGroups;
                    }

                    context.Groups.Update(group);
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'EditGroup'.", ex);
            }
        }

        public List<Groups> GetGroups()
        {
            try
            {
                using (var context = new TMAContext())
                {
                    var groups = context.Groups
                        .Include(x => x.UsersGroups).ThenInclude(x=> x.User)
                        .Where(e => e.IsDeleted == false)
                        .ToList();
                    return groups;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'GetGroups'.", ex);
            }
        }

        public Groups GetGroupById(int groupId)
        {
            try
            {
                using (var context = new TMAContext())
                {
                    var group = context.Groups
                        .Include(x => x.UsersGroups).ThenInclude(x => x.User)
                        .FirstOrDefault(e => e.GroupId == groupId && e.IsDeleted == false);
                    if (group == null)
                        throw new Exception($"Group for groupId [{groupId}] was not found.");
                    return group;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'GetGroupById'.", ex);
            }
        }

        public Groups GetGroupByName(string groupName)
        {
            try
            {
                using (var context = new TMAContext())
                {
                    var group = context.Groups
                        .Include(x => x.UsersGroups).ThenInclude(x => x.User )
                        .FirstOrDefault(e => e.GroupName.ToLower() == groupName.ToLower() && e.IsDeleted == false);
                    if (group == null)
                        throw new Exception($"Group for groupName [{groupName}] was not found.");
                    return group;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'GetGroupByName'.", ex);
            }
        }

        public void DeleteGroup(int groupId)
        {
            try
            {
                using (var context = new TMAContext())
                {
                    var group = context.Groups.FirstOrDefault(e => e.GroupId == groupId);
                    if (group == null)
                        throw new Exception($"Event for groupId [{groupId}] was not found.");
                    group.IsDeleted = true;
                    context.Groups.Update(group);
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occuored on 'DeleteEvent'.", ex);
            }
        }


        #endregion
    }
}
