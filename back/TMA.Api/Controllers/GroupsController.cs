using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TMA.Api.Models;
using TMA.BLL;

namespace TMA.Api.Controllers
{
    [Produces("application/json")]
    [Route("Groups")]
    public class GroupsController : Controller
    {
        private readonly MainRepositoryBLL _mainRepository = new MainRepositoryBLL();

        [HttpPost]
        [Route("CreateGroup")]
        public JsonResult CreateGroup([FromBody]GroupModel groupModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _mainRepository.CreateGroup(groupModel.GroupName, groupModel.UserIds);

                    return Json(new { Response = "Success", Message = "Group created successfully." });
                }
                else if (ModelState.ErrorCount > 0)
                {
                    var error = ModelState.Where(x => x.Value.ValidationState.ToString() == "Invalid").FirstOrDefault().Value.Errors.FirstOrDefault().ErrorMessage;
                    return Json(new { Response = "Error", Message = $"Model is invalid: {error}" });
                }

                return Json(new { Response = "Error", Message = "An error occoured creating a new group." });
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }

        [HttpPost]
        [Route("EditGroup")]
        public JsonResult EditGroup([FromBody]GroupModel groupModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _mainRepository.EditGroup(groupModel.GroupId, groupModel.GroupName, groupModel.UserIds);

                    return Json(new { Response = "Success", Message = "Group edited successfully." });
                }
                else if (ModelState.ErrorCount > 0)
                {
                    var error = ModelState.Where(x => x.Value.ValidationState.ToString() == "Invalid").FirstOrDefault().Value.Errors.FirstOrDefault().ErrorMessage;
                    return Json(new { Response = "Error", Message = $"Model is invalid: {error}" });
                }

                return Json(new { Response = "Error", Message = "An error occoured editing group." });
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }

        [HttpPost]
        [Route("DeleteGroup")]
        public JsonResult DeleteGroup([FromBody]int groupId)
        {
            try
            {
                _mainRepository.DeleteGroup(groupId);
                return Json(new { Response = "Success", Message = "Group deleted successfully." });
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }

        [HttpGet]
        [HttpPost]
        [Route("GetGroupByName")]
        public JsonResult GetGroupByName([FromBody]string groupName)
        {
            try
            {
                var getGroup = _mainRepository.GetGroupByName(groupName);
                return Json(getGroup);
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }

        [HttpGet]
        [HttpPost]
        [Route("GetGroupById")]
        public JsonResult GetGroupById([FromBody]int groupId)
        {
            try
            {
                var getGroup = _mainRepository.GetGroupById(groupId);
                return Json(getGroup);
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }

        [HttpGet]
        [HttpPost]
        [Route("GetGroups")]
        public JsonResult GetGroups()
        {
            try
            {
                var groupsModel = new List<GroupModel>();
                var groups = _mainRepository.GetGroups();
                foreach (var group in groups)
                {
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
                    groupsModel.Add(groupModel);
                }
                return Json(groupsModel);
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.InnerException.Message });
            }
        }
    }
}
