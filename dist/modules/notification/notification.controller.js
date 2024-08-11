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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const notification_service_1 = require("./notification.service");
const constants_1 = require("../../constants");
const decorators_1 = require("../../decorators");
const notification_entity_1 = require("./entity/notification.entity");
const userRoles_1 = require("../../casl/userRoles");
const user_schema_1 = require("../user/user.schema");
const notification_update_dto_1 = require("./dto/notification-update.dto");
let NotificationController = class NotificationController {
    constructor(notifyService) {
        this.notifyService = notifyService;
    }
    findall(user, page = 1, limit = 20) {
        return this.notifyService.findall(user.id, page, limit);
    }
    count(user) {
        return this.notifyService.totalCount(user.id);
    }
    totalChatCount(user) {
        return this.notifyService.totalChatCount(user.id);
    }
    updateChatNoti(user, updateDto) {
        return this.notifyService.updateChatNoti(user.id, updateDto);
    }
    update(id, updateDto) {
        return this.notifyService.update(id, updateDto);
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, "Notification"),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get all Notification List",
        type: notification_entity_1.Notify,
    }),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Query)("page")),
    __param(2, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, Object, Object]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "findall", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.notifyRoute.count),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, "Notification"),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get all Notification Count",
        type: notification_entity_1.Notify,
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "count", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.notifyRoute.chatCount),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, "Notification"),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get all Notification Count",
        type: notification_entity_1.Notify,
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "totalChatCount", null);
__decorate([
    (0, common_1.Patch)(constants_1.constTexts.notifyRoute.updateChat),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, "Notification"),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get all Notification Count",
        type: notification_entity_1.Notify,
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, notification_update_dto_1.UpdateNotifyDto]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "updateChatNoti", null);
__decorate([
    (0, common_1.Patch)(constants_1.constTexts.notifyRoute.update),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, "Notification"),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Update Notification",
        type: notification_entity_1.Notify,
    }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, notification_update_dto_1.UpdateNotifyDto]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "update", null);
exports.NotificationController = NotificationController = __decorate([
    (0, common_1.Controller)(constants_1.constTexts.notifyRoute.name),
    (0, swagger_1.ApiTags)(constants_1.constTexts.notifyRoute.name),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map