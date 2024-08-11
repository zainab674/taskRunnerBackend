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
exports.NotifyGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let NotifyGateway = class NotifyGateway {
    async handleConnection(socket) {
        console.log("1socketId connected" + socket.id);
    }
    async handleDisconnect(socket) {
        console.log("disconnect " + socket.id);
    }
    sendNotificationCount(count) {
        this.server.emit("notificationCount", count);
    }
    sendChatNotificationCount(count) {
        this.server.emit("notificationChatCount", count);
    }
};
exports.NotifyGateway = NotifyGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotifyGateway.prototype, "server", void 0);
exports.NotifyGateway = NotifyGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: "notify" })
], NotifyGateway);
//# sourceMappingURL=notify.gateway.js.map