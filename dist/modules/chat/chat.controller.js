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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../constants");
const chat_service_1 = require("./chat.service");
const decorators_1 = require("../../decorators");
const userRoles_1 = require("../../casl/userRoles");
const chat_entities_1 = require("./entities/chat.entities");
const user_schema_1 = require("../user/user.schema");
const platform_express_1 = require("@nestjs/platform-express");
const file_upload_service_1 = require("../fileupload/file-upload.service");
let ChatController = class ChatController {
    constructor(chatService, fileService) {
        this.chatService = chatService;
        this.fileService = fileService;
    }
    async createChat(user, image, createChatDto) {
        createChatDto.senderId = user.id;
        if (image) {
            const imageUrls = await this.fileService.uploadSingleFile(image);
            createChatDto.image = imageUrls;
        }
        return this.chatService.createChat(createChatDto, user);
    }
    findInbox(user) {
        return this.chatService.findInbox(user.id);
    }
    findDetail(user, id) {
        return this.chatService.findDetail(id, user.id);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image")),
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "Chat"),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Create Message",
        type: chat_entities_1.Chat,
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, Object, chat_entities_1.Chat]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createChat", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.chatRoute.inbox),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, "Chat"),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get Inbox User List",
        type: chat_entities_1.Chat,
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "findInbox", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.chatRoute.detail),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, "Chat"),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get all Chat between two users",
        type: chat_entities_1.Chat,
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "findDetail", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)(constants_1.constTexts.chatRoute.name),
    (0, swagger_1.ApiTags)(constants_1.constTexts.chatRoute.name),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        file_upload_service_1.FileUploadService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map