﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TMA.Api.Services
{
    // This class is used by the application to send email for account confirmation and password reset.
    // For more details see https://go.microsoft.com/fwlink/?LinkID=532713
    public class EmailSender : IEmailSender
    {
        //public AuthMessageSenderOptions Options { get; } //set only via Secret Manager

        //public EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor)
        //{
        //    Options = optionsAccessor.Value;
        //}

        private readonly IConfiguration _configuration;

        public EmailSender(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        public Task SendEmailAsync(string email, string subject, string message)
        {
            var apiKey = _configuration.GetSection("SENDGRID_API_KEY").Value;
            //return Execute(Options.SendGridKey, subject, message, email);
            return Execute(apiKey, subject, message, email);
        }

        public Task Execute(string apiKey, string subject, string message, string email)
        {
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("Support@Beehivebi.com", "BeehiveBI Support"),
                Subject = subject,
                PlainTextContent = message,
                HtmlContent = message
            };
            msg.AddTo(new EmailAddress(email));

            // Disable click tracking.
            // See https://sendgrid.com/docs/User_Guide/Settings/tracking.html
            msg.TrackingSettings = new TrackingSettings
            {
                ClickTracking = new ClickTracking { Enable = false }
            };

            return client.SendEmailAsync(msg);
        }
    }
}
