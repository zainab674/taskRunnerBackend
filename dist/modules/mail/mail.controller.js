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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailController = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../constants");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../decorators");
const userRoles_1 = require("../../casl/userRoles");
const mail_service_1 = require("./mail.service");
const mail_schema_1 = require("./schema/mail.schema");
const user_schema_1 = require("../user/user.schema");
let MailController = class MailController {
    constructor(mailService) {
        this.mailService = mailService;
    }
    async reportUser(data, user) {
        data.submitted = {
            name: user.name,
            email: user.email,
        };
        return this.mailService.reportUser(data);
    }
    async contactUs(data, user) {
        return this.mailService.contactUs(data, user);
    }
};
exports.MailController = MailController;
__decorate([
    (0, common_1.Post)(constants_1.constTexts.mailRoute.report),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Report User",
        type: mail_schema_1.UserReportDetailsDto,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "Mail"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mail_schema_1.UserReportDetailsDto, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "reportUser", null);
__decorate([
    (0, common_1.Post)(constants_1.constTexts.mailRoute.contactUs),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Report User",
        type: mail_schema_1.UserReportDetailsDto,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "Mail"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mail_schema_1.ContactUsDto, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "contactUs", null);
exports.MailController = MailController = __decorate([
    (0, common_1.Controller)(constants_1.constTexts.mailRoute.name),
    (0, swagger_1.ApiTags)(constants_1.constTexts.mailRoute.name),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], MailController);
//# sourceMappingURL=mail.controller.js.map