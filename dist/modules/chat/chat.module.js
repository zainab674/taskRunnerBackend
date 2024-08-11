"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const chat_entities_1 = require("./entities/chat.entities");
const chat_service_1 = require("./chat.service");
const auth_module_1 = require("../auth/auth.module");
const chat_gateway_1 = require("./chat.gateway");
const chat_controller_1 = require("./chat.controller");
const user_module_1 = require("../user/user.module");
const notification_module_1 = require("../notification/notification.module");
const axios_1 = require("@nestjs/axios");
const file_upload_service_1 = require("../fileupload/file-upload.service");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: chat_entities_1.Chat.name, schema: chat_entities_1.ChatSchema }]),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            notification_module_1.NotificationModule,
            axios_1.HttpModule,
        ],
        controllers: [chat_controller_1.ChatController],
        providers: [chat_service_1.ChatService, chat_gateway_1.ChatGateway, file_upload_service_1.FileUploadService],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map