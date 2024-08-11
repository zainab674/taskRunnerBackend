"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketModule = void 0;
const common_1 = require("@nestjs/common");
const socket_service_1 = require("./socket.service");
const socket_schema_1 = require("./socket.schema");
const mongoose_1 = require("@nestjs/mongoose");
const gateway_1 = require("./gateway");
const auth_service_1 = require("../auth/auth.service");
const jwt_strategy_1 = require("../auth/jwt.strategy");
const auth_module_1 = require("../auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
const app_config_1 = require("../../configuration/app.config");
const user_module_1 = require("../user/user.module");
const socket_controller_1 = require("./socket.controller");
let SocketModule = class SocketModule {
};
exports.SocketModule = SocketModule;
exports.SocketModule = SocketModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: socket_schema_1.Socket.name, schema: socket_schema_1.SocketSchema }]),
            auth_module_1.AuthModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: async () => ({
                    secret: app_config_1.AppConfig.authConfig.publicKey,
                    signOptions: {},
                }),
            }),
            user_module_1.UserModule
        ],
        controllers: [socket_controller_1.SocketController],
        providers: [socket_service_1.SocketService, gateway_1.MyGateway, auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        exports: [socket_service_1.SocketService],
    })
], SocketModule);
//# sourceMappingURL=socket.module.js.map