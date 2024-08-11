"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignedTasksModule = void 0;
const common_1 = require("@nestjs/common");
const assigned_tasks_service_1 = require("./assigned-tasks.service");
const assigned_tasks_controller_1 = require("./assigned-tasks.controller");
const user_module_1 = require("../user/user.module");
const posts_module_1 = require("../posts/posts.module");
const mongoose_1 = require("@nestjs/mongoose");
const assigned_schema_1 = require("./schema/assigned.schema");
let AssignedTasksModule = class AssignedTasksModule {
};
exports.AssignedTasksModule = AssignedTasksModule;
exports.AssignedTasksModule = AssignedTasksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: assigned_schema_1.AssignedTaskEntity.name, schema: assigned_schema_1.AssignedTaskSchema }]),
            user_module_1.UserModule,
            posts_module_1.PostsModule
        ],
        controllers: [assigned_tasks_controller_1.AssignedTasksController],
        providers: [assigned_tasks_service_1.AssignedTasksService],
        exports: [assigned_tasks_service_1.AssignedTasksService],
    })
], AssignedTasksModule);
//# sourceMappingURL=assigned-tasks.module.js.map