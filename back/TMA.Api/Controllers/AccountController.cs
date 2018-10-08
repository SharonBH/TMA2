using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TMA.Api.Models;
using TMA.Api.Models.AccountViewModels;
using TMA.Api.Models.ManageViewModels;
using TMA.Api.Services;

namespace TMA.Api.Controllers
{
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly ILogger _logger;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IEmailSender emailSender,
            ILogger<AccountController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
            _logger = logger;
        }

        [TempData]
        public string ErrorMessage { get; set; }

        //[HttpGet]
        //[AllowAnonymous]
        //public async Task<IActionResult> Login(string returnUrl = null)
        //{
        //    // Clear the existing external cookie to ensure a clean login process
        //    await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);

        //    ViewData["ReturnUrl"] = returnUrl;
        //    return View();
        //}

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody]LoginModel loginModel)
        {
            try
            {
                var result = await _signInManager.PasswordSignInAsync(loginModel.Username, loginModel.Password, true, false);
                if (result.Succeeded)
                    return Json(new { Response = "Success", Message = "Success" });

                else if (result.RequiresTwoFactor)
                    return Json(new { Response = "Error", Message = "Requires Two Factor Authentication." });

                else if (result.IsLockedOut)
                    return Json(new { Response = "Error", Message = "Ther user is locked." });

                else
                    return Json(new { Response = "Error", Message = "Invalid login attempt." });
            }
            catch (Exception ex)
            {
                    return Json(new { Response = "Error", Message = ex.Message });
            }
        }

        #region Not relevant for now

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public IActionResult ExternalLogin(string provider, string returnUrl = null)
        {
            // Request a redirect to the external login provider.
            var redirectUrl = Url.Action(nameof(ExternalLoginCallback), "Account", new { returnUrl });
            var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
            return Challenge(properties, provider);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null, string remoteError = null)
        {
            if (remoteError != null)
            {
                ErrorMessage = $"Error from external provider: {remoteError}";
                return RedirectToAction(nameof(Login));
            }
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return RedirectToAction(nameof(Login));
            }

            // Sign in the user with this external login provider if the user already has a login.
            var result = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false, bypassTwoFactor: true);
            if (result.Succeeded)
            {
                _logger.LogInformation("User logged in with {Name} provider.", info.LoginProvider);
                return RedirectToLocal(returnUrl);
            }
            if (result.IsLockedOut)
            {
                return RedirectToAction(nameof(Lockout));
            }
            else
            {
                // If the user does not have an account, then ask the user to create an account.
                ViewData["ReturnUrl"] = returnUrl;
                ViewData["LoginProvider"] = info.LoginProvider;
                var email = info.Principal.FindFirstValue(ClaimTypes.Email);
                return View("ExternalLogin", new ExternalLoginViewModel { Email = email });
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ExternalLoginConfirmation(ExternalLoginViewModel model, string returnUrl = null)
        {
            if (ModelState.IsValid)
            {
                // Get the information about the user from the external login provider
                var info = await _signInManager.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    throw new ApplicationException("Error loading external login information during confirmation.");
                }
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await _userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    result = await _userManager.AddLoginAsync(user, info);
                    if (result.Succeeded)
                    {
                        await _signInManager.SignInAsync(user, isPersistent: false);
                        _logger.LogInformation("User created an account using {Name} provider.", info.LoginProvider);
                        return RedirectToLocal(returnUrl);
                    }
                }
                AddErrors(result);
            }

            ViewData["ReturnUrl"] = returnUrl;
            return View(nameof(ExternalLogin), model);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> LoginWith2fa(bool rememberMe, string returnUrl = null)
        {
            // Ensure the user has gone through the username & password screen first
            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();

            if (user == null)
            {
                throw new ApplicationException($"Unable to load two-factor authentication user.");
            }

            var model = new LoginWith2faViewModel { RememberMe = rememberMe };
            ViewData["ReturnUrl"] = returnUrl;

            return View(model);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> LoginWith2fa(LoginWith2faViewModel model, bool rememberMe, string returnUrl = null)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            var authenticatorCode = model.TwoFactorCode.Replace(" ", string.Empty).Replace("-", string.Empty);

            var result = await _signInManager.TwoFactorAuthenticatorSignInAsync(authenticatorCode, rememberMe, model.RememberMachine);

            if (result.Succeeded)
            {
                _logger.LogInformation("User with ID {UserId} logged in with 2fa.", user.Id);
                return RedirectToLocal(returnUrl);
            }
            else if (result.IsLockedOut)
            {
                _logger.LogWarning("User with ID {UserId} account locked out.", user.Id);
                return RedirectToAction(nameof(Lockout));
            }
            else
            {
                _logger.LogWarning("Invalid authenticator code entered for user with ID {UserId}.", user.Id);
                ModelState.AddModelError(string.Empty, "Invalid authenticator code.");
                return View();
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> LoginWithRecoveryCode(string returnUrl = null)
        {
            // Ensure the user has gone through the username & password screen first
            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                throw new ApplicationException($"Unable to load two-factor authentication user.");
            }

            ViewData["ReturnUrl"] = returnUrl;

            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> LoginWithRecoveryCode(LoginWithRecoveryCodeViewModel model, string returnUrl = null)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                throw new ApplicationException($"Unable to load two-factor authentication user.");
            }

            var recoveryCode = model.RecoveryCode.Replace(" ", string.Empty);

            var result = await _signInManager.TwoFactorRecoveryCodeSignInAsync(recoveryCode);

            if (result.Succeeded)
            {
                _logger.LogInformation("User with ID {UserId} logged in with a recovery code.", user.Id);
                return RedirectToLocal(returnUrl);
            }
            if (result.IsLockedOut)
            {
                _logger.LogWarning("User with ID {UserId} account locked out.", user.Id);
                return RedirectToAction(nameof(Lockout));
            }
            else
            {
                _logger.LogWarning("Invalid recovery code entered for user with ID {UserId}", user.Id);
                ModelState.AddModelError(string.Empty, "Invalid recovery code entered.");
                return View();
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Lockout()
        {
            return View();
        }

        #endregion

        //[HttpGet]
        //[AllowAnonymous]
        //public IActionResult Register(string returnUrl = null)
        //{
        //    ViewData["ReturnUrl"] = returnUrl;
        //    return View();
        //}

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register(UserModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = new ApplicationUser
                    {
                        UserName = model.Username,
                        Email = model.Email,
                        Name = model.Name
                    };

                    var result = await _userManager.CreateAsync(user, model.Password);
                    if (result.Succeeded)
                    {
                        _logger.LogInformation("User created a new account with password.");

                        var currentUser = await _userManager.FindByNameAsync(user.UserName);
                        var roleresult = await _userManager.AddToRoleAsync(currentUser, model.Role);
                        if (roleresult.Succeeded)
                        {
                            await _signInManager.SignInAsync(user, isPersistent: false);
                            _logger.LogInformation("User created a new account with password.");
                            return Json(new { Response = "Success", Message = "User created successfully." });
                        }
                        else
                        {
                            var deleteUser = await _userManager.DeleteAsync(user);
                            return Json(new { Response = "Error", Message = roleresult.Errors.FirstOrDefault().Description });
                        }
                    }
                    else
                        return Json(new { Response = "Error", Message = result.Errors.FirstOrDefault().Description });
                }
                else if (ModelState.ErrorCount > 0)
                {
                    var error = ModelState.Where(x => x.Value.ValidationState.ToString() == "Invalid").FirstOrDefault().Value.Errors.FirstOrDefault().ErrorMessage;
                    return Json(new { Response = "Error", Message = error });
                }

                return Json(new { Response = "Error", Message = "An error occoured creating a new user." });
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            _logger.LogInformation("User logged out.");
            return RedirectToAction(nameof(HomeController.Index), "Home");
        }


        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return RedirectToAction(nameof(HomeController.Index), "Home");
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{userId}'.");
            }
            var result = await _userManager.ConfirmEmailAsync(user, code);
            return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }

        //[HttpGet]
        //[AllowAnonymous]
        //public IActionResult ForgotPassword()
        //{
        //    return View();
        //}

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = await _userManager.FindByEmailAsync(model.Email);
                    if (user == null)
                    {
                        // Don't reveal that the user does not exist or is not confirmed
                        return Json(new { Response = "Success", Message = "Email for forgot password send to user." });
                    }

                    var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                    var callbackUrl = Url.ResetPasswordCallbackLink(user.Email, code, Request.Scheme);
                    await _emailSender.SendEmailAsync(model.Email, "Reset Password",
                       $"Please reset your password by clicking here: <a href='{callbackUrl}'>link</a>");
                    return Json(new { Response = "Success", Message = "Email for forgot password send to user" });
                }

                return Json(new { Response = "Error", Message = "An error occoured forgot password." });
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.Message });
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        //[HttpGet]
        //[AllowAnonymous]
        //public IActionResult ResetPassword(string code = null)
        //{
        //    if (code == null)
        //    {
        //        throw new ApplicationException("A code must be supplied for password reset.");
        //    }
        //    var model = new ResetPasswordViewModel { Code = code };
        //    return View(model);
        //}

        [HttpGet]
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return Redirect("https://tma-front.azurewebsites.net/change_password");
                //return RedirectToAction(nameof(ResetPasswordConfirmation));
            }
            var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded)
            {
                return Redirect("https://tma-front.azurewebsites.net/change_password?username="+ user.UserName);
                //return RedirectToAction(nameof(ResetPasswordConfirmation));
            }
            AddErrors(result);
            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPasswordConfirmation()
        {
            return View();
        }


        [HttpGet]
        public IActionResult AccessDenied()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteUser(string username)
        {
            try
            {
                // Look for user in the UserStore
                var user = _userManager.Users.SingleOrDefault(u => u.UserName == username);

                // If not found, exit
                if (user == null)
                {
                    return Json(new { Response = "Error", Message = "User was not found" });
                }

                // Remove user from role first!
                var userRoles = await _userManager.GetRolesAsync(user);
                if (userRoles.Count == 0)
                {
                    return Json(new { Response = "Error", Message = $"User [{username}] has no role, add role to user before delete." });
                }
                else
                { 
                    var remFromRole = await _userManager.RemoveFromRoleAsync(user, userRoles.FirstOrDefault());

                    // If successful
                    if (remFromRole.Succeeded)
                    {
                        // Remove user from UserStore
                        var results = await _userManager.DeleteAsync(user);

                        // If successful
                        if (results.Succeeded)
                        {
                            // Redirect to Users page
                            return Json(new { Response = "Success", Message = $"User [{username}] was deleted successfully." });
                        }
                        else
                        {
                            return Json(new { Response = "Error", Message = $"User [{username}] was not deleted." });
                        }
                    }
                    else
                    {
                        return Json(new { Response = "Error", Message = $"User [{username}] has no role or can't delete role." });
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.Message });
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> EditUser(UserModel userModel)
        {
            try
            {
                // Look for user in the UserStore
                var user = _userManager.Users.SingleOrDefault(u => u.UserName == userModel.Username);

                // If not found, exit
                if (user == null)
                {
                    return Json(new { Response = "Error", Message = "User was not found" });
                }

                // Remove user from role first!
                var userRoles = await _userManager.GetRolesAsync(user);
                var userRole = userRoles.FirstOrDefault();
                if (userRole != null)
                {
                    if (userRole != userModel.Role)
                    {
                        await _userManager.RemoveFromRoleAsync(user, userRole);
                        var remFromRole = await _userManager.AddToRoleAsync(user, userModel.Role);
                    }
                }
                else
                {
                    var remFromRole = await _userManager.AddToRoleAsync(user, userModel.Role);
                }


                user.Name = user.Name != userModel.Name ? userModel.Name : user.Name;
                if (user.Email != userModel.Email)
                {
                    var isEmailExist = _userManager.Users.Any(u => u.Email == userModel.Email);
                    if (isEmailExist)
                        return Json(new { Response = "Error", Message = "Email already exist." });

                    user.Email = userModel.Email;
                }

                var results = await _userManager.UpdateAsync(user);

                // If successful
                if (results.Succeeded)
                    // Redirect to Users page
                    return Json(new { Response = "Success", Message = $"User {user} was edited successfully." });

                else
                    return Json(new { Response = "Error", Message = results.Errors });
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.Message });
            }
        }

        [HttpPost]
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserAsync(string username)
        {
            try
            {
                // Look for user in the UserStore
                var user = _userManager.Users.SingleOrDefault(u => u.UserName == username);

                // If not found, exit
                if (user == null)
                {
                    return Json(new { Response = "Error", Message = "User was not found" });
                }

                var userRoles = await _userManager.GetRolesAsync(user);
                var userRole = userRoles.FirstOrDefault();

                var userModel = new UserModel()
                {
                    Email = user.Email,
                    Name = user.Name,
                    Username = user.UserName,
                    Role = userRole
                };

                return Json(userModel);
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.Message });
            }
        }


        [HttpPost]
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var users = _userManager.Users;
                var usersList = new List<UserModel>();
                foreach (var user in users)
                {
                    var userRoles = await _userManager.GetRolesAsync(user);
                    var userRole = userRoles.FirstOrDefault();

                    var userModel = new UserModel()
                    {
                        Email = user.Email,
                        Name = user.Name,
                        Username = user.UserName,
                        Role = userRole
                    };

                    usersList.Add(userModel);
                }
                return Json(usersList);
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> ChangePassword(ChangePasswordViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = _userManager.Users.SingleOrDefault(u => u.UserName == model.Username);
                    if (user == null)
                    {
                        return Json(new { Response = "Error", Message = $"User '{model.Username}' was not found." });
                    }

                    var changePasswordResult = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
                    if (!changePasswordResult.Succeeded)
                    {
                        return Json(new { Response = "Error", Message = changePasswordResult.Errors.FirstOrDefault().Description });
                    }

                    _logger.LogInformation("User changed their password successfully.");
                    return Json(new { Response = "Success", Message = "Your password has been changed." });
                }
                else if (ModelState.ErrorCount > 0)
                {
                    var error = ModelState.Where(x => x.Value.ValidationState.ToString() == "Invalid").FirstOrDefault().Value.Errors.FirstOrDefault().ErrorMessage;
                    return Json(new { Response = "Error", Message = error });
                }

                return Json(new { Response = "Error", Message = "An error occoured changing password." });
            }
            catch (Exception ex)
            {
                return Json(new { Response = "Error", Message = ex.Message });
            }
        }


        #region Helpers

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction(nameof(HomeController.Index), "Home");
            }
        }

        #endregion
    }
}
