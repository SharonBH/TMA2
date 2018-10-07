using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
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
                    _mainRepository.CreateTournament(tournamentModel.TournamentName, tournamentModel.StartDate, tournamentModel.EndDate, tournamentModel.NumberOfEvents);

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
                    _mainRepository.EditTournament(tournamentModel.TournamentId, tournamentModel.TournamentName, tournamentModel.StartDate, tournamentModel.EndDate, tournamentModel.NumberOfEvents);

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
        public JsonResult DeleteTournament(int tournamentId)
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
                var getTournaments = _mainRepository.GetTournaments();
                return Json(getTournaments);
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }
    }
}
