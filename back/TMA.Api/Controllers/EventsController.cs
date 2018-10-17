using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TMA.BLL;

namespace TMA.Api.Controllers
{
    [Produces("application/json")]
    [Route("Events")]
    public class EventsController : Controller
    {
        private readonly MainRepositoryBLL _mainRepository = new MainRepositoryBLL();

        [HttpPost]
        [Route("CreateEvent")]
        public JsonResult CreateEvent([FromBody]EventModel eventModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _mainRepository.CreateEvent(eventModel.EventName, eventModel.EventDate, eventModel.TournamentName, eventModel.EventResults);

                    return Json(new { Response = "Success", Message = "Event created successfully." });
                }
                else if (ModelState.ErrorCount > 0)
                {
                    var error = ModelState.Where(x => x.Value.ValidationState.ToString() == "Invalid").FirstOrDefault().Value.Errors.FirstOrDefault().ErrorMessage;
                    return Json(new { Response = "Error", Message = $"Model is invalid: {error}" });
                }

                return Json(new { Response = "Error", Message = "An error occoured creating a new event." });
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }

        [HttpPost]
        [Route("EditEvent")]
        public JsonResult EditEvent([FromBody]EventModel eventModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _mainRepository.EditEvent(eventModel.EventId, eventModel.EventName, eventModel.EventDate, eventModel.TournamentName, eventModel.EventResults);

                    return Json(new { Response = "Success", Message = "Event edited successfully." });
                }
                else if (ModelState.ErrorCount > 0)
                {
                    var error = ModelState.Where(x => x.Value.ValidationState.ToString() == "Invalid").FirstOrDefault().Value.Errors.FirstOrDefault().ErrorMessage;
                    return Json(new { Response = "Error", Message = $"Model is invalid: {error}" });
                }

                return Json(new { Response = "Error", Message = "An error occoured editing event." });
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }

        [HttpPost]
        [Route("DeleteEvent")]
        public JsonResult DeleteEvent([FromBody]int eventId)
        {
            try
            {
                _mainRepository.DeleteEvent(eventId);
                return Json(new { Response = "Success", Message = "Event deleted successfully." });
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }

        [HttpGet]
        [HttpPost]
        [Route("GetEventByName")]
        public JsonResult GetEventByName([FromBody]string eventName)
        {
            try
            {
                var getEvent = _mainRepository.GetEventByName(eventName);
                return Json(getEvent);
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }

        [HttpGet]
        [HttpPost]
        [Route("GetEventById")]
        public JsonResult GetEventById([FromBody]int eventId)
        {
            try
            {
                var getEvent = _mainRepository.GetEventById(eventId);
                return Json(getEvent);
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }

        [HttpGet]
        [HttpPost]
        [Route("GetEvents")]
        public JsonResult GetEvents()
        {
            try
            {
                var getEvents = _mainRepository.GetEvents();
                return Json(getEvents);
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }


        [HttpGet]
        [HttpPost]
        [Route("GetEventTypes")]
        public JsonResult GetEventTypes()
        {
            try
            {
                var eventTypes = _mainRepository.GetEventTypes();
                return Json(eventTypes);
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }

        //// GET: api/Events/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST: api/Events
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT: api/Events/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
