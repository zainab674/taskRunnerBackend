"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const utils_1 = require("../../common/utils");
const SendGrid = require("@sendgrid/mail");
const exceptions_1 = require("../../exceptions");
let MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
        SendGrid.setApiKey("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");
    }
    async sendUserConfirmation(user, token) {
        const encoded = (0, utils_1.stringEncode)(user.email, 5);
        const url = "http://localhost:3000/auth/" + encoded;
        await this.mailerService.sendMail({
            to: user.email,
            subject: "Welcome to  App! Confirm your Email",
            template: "email",
            context: {
                name: user.name,
                url,
                token,
                email: user.email,
            },
        });
    }
    async sendForgetPasswordEmail(user) {
        const mail = {
            to: user.email,
            subject: "Forget Password Confirm your Email",
            from: "support@taskruns.com",
            text: "Hello",
            html: `<p>Thanks for requesting password reset for Task Runs!</p>

      <p>Please enter the following verification code into the application to complete the password reset:</p>
      <strong>${user.otp}</strong>
      <p><strong>Why you received this email:</strong></p>
  
      <p>Task Runs requires verification in order to reset your password.</p>
  
      <p>If you did not make this request, you can ignore this email.</p>
  
      <p>Best regards,<br>Task Runs Team</p>`,
        };
        const transport = await SendGrid.send(mail);
        console.log(`E-Mail sent to ${mail.to}`);
        if (transport[0].statusCode === 202) {
            return `E-Mail sent to ${mail.to}`;
        }
        throw new common_1.HttpException("Email not sent", exceptions_1.ResponseCode.BAD_REQUEST);
    }
    async sendVerifyEMailEmail(user) {
        const mail = {
            to: user.email,
            subject: "Email verification",
            from: {
                name: "Task Runs",
                email: "support@taskruns.com",
            },
            text: "Hello",
            html: ` <p>Thanks for registering with Task Runs!</p>

      <p>Please enter the following verification code into the application to complete the registration process: </p>
      <strong>${user.otp}</strong>
      <p><strong>Why you received this email:</strong></p>
  
      <p>Task Runs requires verification whenever an email address is entered during a new account creation. Your account cannot be used until you verify it.</p>
  
      <p>If you did not make this request, you can ignore this email. No account will be created without verification.</p>
  
      <p>Best regards,<br>Task Runs Team</p>`,
        };
        const transport = await SendGrid.send(mail);
        console.log(`E-Mail sent to ${mail.to}`);
        if (transport[0].statusCode === 202) {
            return `E-Mail sent to ${mail.to}`;
        }
        throw new common_1.HttpException("Email not sent", exceptions_1.ResponseCode.BAD_REQUEST);
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
//# sourceMappingURL=mail.service.js.map