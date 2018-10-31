using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TMA.Api.Models;
using TMA.BLL;

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
                    _mainRepository.CreateTournament(tournamentModel.TournamentName, tournamentModel.EventTypeName, tournamentModel.StartDate, tournamentModel.EndDate, tournamentModel.NumberOfEvents, tournamentModel.GroupId);

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
                    _mainRepository.EditTournament(tournamentModel.TournamentId, tournamentModel.TournamentName, tournamentModel.EventTypeName, tournamentModel.StartDate, tournamentModel.EndDate, tournamentModel.NumberOfEvents, tournamentModel.GroupId);

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

                    //var tournamentsEvents = new List<EventModel>();
                    //foreach (var tournamentEvent in tournament.Events)
                    //{
                    //    var eventModel = new EventModel
                    //    {
                    //        EventName = tournamentEvent.EventName,
                    //        EventDate = tournamentEvent.EventDate,
                    //        EventId = tournamentEvent.EventId,
                    //        EventResults = tournamentEvent.EventResults.ToList()
                    //    };
                    //    tournamentsEvents.Add(eventModel);
                    //}
                    //tournamentModel.Events = tournamentsEvents;
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
    }
}
