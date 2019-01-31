using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TMA.Api.Models;
using TMA.BLL;
using TMA.DAL;
using TMA.DAL.Models.DB;

namespace TMA.Api.Controllers
{
    [Produces("application/json")]
    [Route("Tournaments")]
    public class TournamentsController : Controller
    {
        private readonly MainRepositoryBLL _mainRepository = new MainRepositoryBLL();

        [HttpPost]
        [Route("CreateTournament")]
        public JsonResult CreateTournament([FromBody]TournamentModel tournamentModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var tournamentId = _mainRepository.CreateTournament(tournamentModel.TournamentName, tournamentModel.EventTypeName, tournamentModel.StartDate, tournamentModel.EndDate, tournamentModel.NumberOfEvents, tournamentModel.GroupId, tournamentModel.TournamentTypeName);
                    if (string.IsNullOrEmpty(tournamentModel.TournamentTypeName) == false || tournamentModel.DurationId > 0)
                        _mainRepository.CreateTournamentPresets(tournamentId, tournamentModel.TournamentTypeName, tournamentModel.NumberOfPresets ?? 1, (DAL.Models.Duration)tournamentModel.DurationId);
                    return Json(new { Response = "Success", Message = "Tournament created successfully." });
                }
                else if (ModelState.ErrorCount > 0)
                {
                    var error = ModelState.Where(x => x.Value.ValidationState.ToString() == "Invalid").FirstOrDefault().Value.Errors.FirstOrDefault().ErrorMessage;
                    return Json(new { Response = "Error", Message = error });
                }

                return Json(new { Response = "Error", Message = "An error occoured creating a new tournament." });
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }

        [HttpPost]
        [Route("EditTournament")]
        public JsonResult EditTournament([FromBody]TournamentModel tournamentModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _mainRepository.EditTournament(tournamentModel.TournamentId, tournamentModel.TournamentName, tournamentModel.EventTypeName, tournamentModel.StartDate, tournamentModel.EndDate, tournamentModel.NumberOfEvents, tournamentModel.GroupId, tournamentModel.TournamentTypeName, tournamentModel.TermsAndConditions);

                    return Json(new { Response = "Success", Message = "Tournament edited successfully." });
                }
                else if (ModelState.ErrorCount > 0)
                {
                    var error = ModelState.Where(x => x.Value.ValidationState.ToString() == "Invalid").FirstOrDefault().Value.Errors.FirstOrDefault().ErrorMessage;
                    return Json(new { Response = "Error", Message = error });
                }

                return Json(new { Response = "Error", Message = "An error occoured editing tournament." });
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }

        [HttpPost]
        [Route("DeleteTournament")]
        public JsonResult DeleteTournament([FromBody]int tournamentId)
        {
            try
            {
                _mainRepository.DeleteTournament(tournamentId);
                return Json(new { Response = "Success", Message = "Tournament deleted successfully." });
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }

        [HttpGet]
        [HttpPost]
        [Route("GetTournamentByName")]
        public JsonResult GetTournamentByName([FromBody]string tournamentName)
        {
            try
            {
                var getTournament = _mainRepository.GetTournamentByName(tournamentName);
                return Json(getTournament);
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }

        [HttpGet]
        [HttpPost]
        [Route("GetTournamentById")]
        public JsonResult GetTournamentById([FromBody]int tournamentId)
        {
            try
            {
                var getTournament = _mainRepository.GetTournamentById(tournamentId);
                return Json(getTournament);
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }

        [HttpGet]
        [HttpPost]
        [Route("GetTournaments")]
        public JsonResult GetTournaments()
        {
            try
            {
                var tournamentsModel = new List<TournamentModel>();
                var tournaments = _mainRepository.GetTournaments();
                foreach (var tournament in tournaments)
                {
                    var tournamentModel = new TournamentModel
                    {
                        TournamentId = tournament.TournamentId,
                        TournamentName = tournament.TournamentName,
                        EventTypeName = tournament.EventType.EventTypeName,
                        StartDate = tournament.StartDate,
                        EndDate = tournament.EndDate,
                        NumberOfEvents = (int?)tournament.NumberOfEvents,
                        GroupId = tournament.GroupId,
                        TermsAndConditions = tournament.TermsAndConditions
                    };

                    var group = _mainRepository.GetGroupById(tournament.GroupId);
                    var groupModel = new GroupModel
                    {
                        GroupName = group.GroupName,
                        GroupId = group.GroupId
                    };

                    var users = new List<UserModel>();
                    foreach (var usersGroups in group.UsersGroups)
                    {
                        var user = new UserModel
                        {
                            UserId = usersGroups.User.Id,
                            Email = usersGroups.User.Email,
                            Username = usersGroups.User.UserName,
                            Name = usersGroups.User.Name
                        };
                        users.Add(user);
                    }
                    groupModel.Users = users;
                    tournamentModel.GroupModel = groupModel;
                    tournamentModel.EventsCount = tournament.Events.Count;

                    tournamentsModel.Add(tournamentModel);
                }

                return Json(tournamentsModel);
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }

        [HttpGet]
        [HttpPost]
        [Route("GetUserTournaments")]
        public JsonResult GetUserTournaments([FromBody]string userId)
        {
            try
            {
                var tournamentsModel = new List<TournamentModel>();
                var tournaments = _mainRepository.GetUserTournaments(userId);
                foreach (var tournament in tournaments)
                {
                    var tournamentModel = new TournamentModel
                    {
                        TournamentId = tournament.TournamentId,
                        TournamentName = tournament.TournamentName,
                        EventTypeName = tournament.EventType.EventTypeName,
                        StartDate = tournament.StartDate,
                        EndDate = tournament.EndDate,
                        NumberOfEvents = (int?)tournament.NumberOfEvents,
                        GroupId = tournament.GroupId
                    };

                    var group = _mainRepository.GetGroupById(tournament.GroupId);
                    var groupModel = new GroupModel
                    {
                        GroupName = group.GroupName,
                        GroupId = group.GroupId
                    };

                    var users = new List<UserModel>();
                    foreach (var usersGroups in group.UsersGroups)
                    {
                        var user = new UserModel
                        {
                            UserId = usersGroups.User.Id,
                            Email = usersGroups.User.Email,
                            Username = usersGroups.User.UserName,
                            Name = usersGroups.User.Name
                        };
                        users.Add(user);
                    }
                    groupModel.Users = users;
                    tournamentModel.GroupModel = groupModel;
                    tournamentModel.EventsCount = tournament.Events.Count;

                    tournamentsModel.Add(tournamentModel);
                }

                return Json(tournamentsModel);
                //var userTournaments = _mainRepository.GetUserTournaments(userId);
                //return Json(userTournaments);
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }

        [HttpPost]
        [Route("GetLeaderboards")]
        public JsonResult GetLeaderboards([FromBody]int tournamentId)
        {
            try
            {
                var leaderboards = _mainRepository.GetLeaderboards(tournamentId);
                var leaderboardsModel = CreateLeaderboardViewModel(leaderboards);

                return Json(leaderboardsModel);
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }

        [HttpPost]
        [Route("GetHomeLeaderboards")]
        public JsonResult GetHomeLeaderboards([FromBody]string userId)
        {
            try
            {
                var homeLeaderboards = _mainRepository.GetHomeLeaderboards(userId);
                var result = new List<object>();
                foreach (var homeLeaderboard in homeLeaderboards)
                {
                    var leaderboards = CreateLeaderboardViewModel(homeLeaderboard.Leaderboards);
                    var nextEvent = CreateEventsModel(homeLeaderboard.NextEvent);
                    result.Add(new { Leaderboards = leaderboards, NextEvent = nextEvent });
                }
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }

        [HttpPost]
        [Route("CreateTournamentPresets")]
        public JsonResult CreateTournamentPresets([FromBody]TournamentPresetsModel tournamentPresetsModel)
        {
            try
            {
                _mainRepository.CreateTournamentPresets(tournamentPresetsModel.TournamentId, tournamentPresetsModel.TournamentTypeName, tournamentPresetsModel.NumberOfPresets ?? 1);
                return Json(new { Response = "Success", Message = "Tournament round events created successfully." });
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }
               

        private List<LeaderboardViewModel> CreateLeaderboardViewModel(List<LeaderboardModel> leaderboards)
        {
            try
            {
                var leaderboardsModel = new List<LeaderboardViewModel>();
                foreach (var leaderboard in leaderboards)
                {
                    var userAvatar = _mainRepository.GetUserAvatar(leaderboard.User.UserName);
                    var user = new UserModel
                    {
                        UserId = leaderboard.User.Id,
                        Email = leaderboard.User.Email,
                        Username = leaderboard.User.UserName,
                        Name = leaderboard.User.Name,
                        Avatar = userAvatar //leaderboard.User.UsersAvatar.Avatar
                    };
                    var leaderboardModel = new LeaderboardViewModel
                    {
                        User = user,
                        NumberOfEvents = leaderboard.NumberOfEvents,
                        TotalScores = leaderboard.TotalScores,
                        GoalsAgainst = leaderboard.GoalsAgainst,
                        GoalsScored = leaderboard.GoalsScored,
                        SuccessPercentage = leaderboard.SuccessPercentage
                    };

                    leaderboardsModel.Add(leaderboardModel);
                }
                return leaderboardsModel;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error occoured in 'CreateLeaderboardViewModel'", ex);
            }
        }
        private EventModel CreateEventsModel(Events getEvent)
        {
            if (getEvent == null)
                return null;

            var eventModel = new EventModel
            {
                EventName = getEvent.EventName,
                EventDate = getEvent.EventDate,
                EventId = getEvent.EventId,
                TournamentName = getEvent.Tournament?.TournamentName,
                TournamentTypeId = getEvent.Tournament?.EventTypeId ?? 0
            };
            return eventModel;
        }
    }
}
