"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const casl_module_1 = require("./casl/casl.module");
const configuration_module_1 = require("./configuration/configuration.module");
const configuration_service_1 = require("./configuration/configuration.service");
const auth_module_1 = require("./modules/auth/auth.module");
const posts_module_1 = require("./modules/posts/posts.module");
const assigned_tasks_module_1 = require("./modules/assigned-tasks/assigned-tasks.module");
const comments_module_1 = require("./modules/comments/comments.module");
const socket_module_1 = require("./modules/socket/socket.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const admin_module_1 = require("./modules/admin/admin.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            configuration_module_1.ConfigurationModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.env.${process.env.NODE_ENV}`,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [configuration_module_1.ConfigurationModule],
                useFactory: async (configService) => configService.mongooseConfig,
                inject: [configuration_service_1.ConfigurationService],
            }),
            auth_module_1.AuthModule,
            casl_module_1.CaslModule,
            posts_module_1.PostsModule,
            assigned_tasks_module_1.AssignedTasksModule,
            comments_module_1.CommentsModule,
            socket_module_1.SocketModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            admin_module_1.AdminModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
        exports: [AppModule],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map