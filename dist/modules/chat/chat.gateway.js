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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../auth/auth.service");
const user_service_1 = require("../user/user.service");
let ChatGateway = class ChatGateway {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
        this.connectedUsers = new Map();
    }
    async handleConnection(socket) {
        console.log("1socketId connected" + socket.id);
        const token = socket.handshake.headers.authorization;
        const user = this.authService.getUserFromToken(token);
        console.log("user", user);
        if (user) {
            console.log("user connected" + user + "sockit" + socket.id);
            this.connectedUsers.set(user, socket);
            this.userService.chatOpen(user, true);
            return;
        }
    }
    async handleDisconnect(socket) {
        var _a;
        console.log("disconnect " + socket.id);
        const userId = (_a = Array.from(this.connectedUsers.entries()).find(([key, value]) => value === socket)) === null || _a === void 0 ? void 0 : _a[0];
        console.log("disconnect userId " + userId);
        if (userId) {
            this.userService.chatOpen(userId, false);
            this.connectedUsers.delete(userId);
        }
    }
    async createChat(chat) {
        console.log(this.connectedUsers);
        const recipientSocketId = this.getRecipientSocketId(chat.recipientId.toString());
        if (recipientSocketId) {
            this.server.to(recipientSocketId).emit("messageToClient", chat);
        }
    }
    getRecipientSocketId(recipientId) {
        var _a;
        return (_a = this.connectedUsers.get(recipientId)) === null || _a === void 0 ? void 0 : _a.id;
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: "msg" }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map