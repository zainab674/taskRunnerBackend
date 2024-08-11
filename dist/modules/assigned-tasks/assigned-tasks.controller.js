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
exports.AssignedTasksController = void 0;
const common_1 = require("@nestjs/common");
const assigned_tasks_service_1 = require("./assigned-tasks.service");
const create_assigned_task_dto_1 = require("./dto/create-assigned-task.dto");
const userRoles_1 = require("../../casl/userRoles");
const decorators_1 = require("../../decorators");
const assigned_schema_1 = require("./schema/assigned.schema");
const user_schema_1 = require("../user/user.schema");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../constants");
const exceptions_1 = require("../../exceptions");
const update_assigned_task_dto_1 = require("./dto/update-assigned-task.dto");
const posts_service_1 = require("../posts/posts.service");
let AssignedTasksController = class AssignedTasksController {
    constructor(assignedTasksService, postService) {
        this.assignedTasksService = assignedTasksService;
        this.postService = postService;
    }
    async create(user, createAssignedTaskDto) {
        createAssignedTaskDto.OwnerId = user.id;
        return this.assignedTasksService.create(createAssignedTaskDto);
    }
    async ownerAssigns(user) {
        const ownerId = user.id;
        return this.assignedTasksService.ownerAssigns(ownerId);
    }
    async runnerAssigns(user) {
        const Id = user.id;
        return this.assignedTasksService.runnerAssigns(Id);
    }
    async remove(id, user) {
        const userId = user.id;
        return this.assignedTasksService.remove(id, userId);
    }
    async update(id, updateAssignedTaskDto, user) {
        const userId = user.id;
        try {
            const result = await this.assignedTasksService.update(id, updateAssignedTaskDto, userId);
            const res = await this.postService.completed(id, userId);
            return { result, res };
        }
        catch (err) {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        }
    }
    async getFinalRating(userId) {
        return this.assignedTasksService.getFinalRating(userId);
    }
    async getMyCompTasks(userId) {
        return this.assignedTasksService.completedForUser(userId);
    }
    async completedByUser(userId) {
        return this.assignedTasksService.completedByUser(userId);
    }
    async accepted(id, user) {
        const userId = user.id;
        try {
            const res = await this.postService.completed(id, userId);
            return { res };
        }
        catch (err) {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        }
    }
};
exports.AssignedTasksController = AssignedTasksController;
__decorate([
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "Post"),
    (0, common_1.Post)(),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Assigned Post",
        type: assigned_schema_1.AssignedTaskEntity,
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User,
        create_assigned_task_dto_1.CreateAssignedTaskDto]),
    __metadata("design:returntype", Promise)
], AssignedTasksController.prototype, "create", null);
__decorate([
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "Post"),
    (0, common_1.Get)(constants_1.constTexts.assignedRoute.byMe),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Feteched Assigned Post",
        type: assigned_schema_1.AssignedTaskEntity,
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], AssignedTasksController.prototype, "ownerAssigns", null);
__decorate([
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "Post"),
    (0, common_1.Get)(constants_1.constTexts.assignedRoute.toMe),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Feteched Assigned Post",
        type: assigned_schema_1.AssignedTaskEntity,
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], AssignedTasksController.prototype, "runnerAssigns", null);
__decorate([
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "Post"),
    (0, common_1.Delete)(constants_1.constTexts.assignedRoute.delete),
    (0, decorators_1.ApiPageOkResponse)({
        description: " UnAssigned Post",
        type: assigned_schema_1.AssignedTaskEntity,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], AssignedTasksController.prototype, "remove", null);
__decorate([
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "Post"),
    (0, common_1.Put)(constants_1.constTexts.assignedRoute.update),
    (0, decorators_1.ApiPageOkResponse)({
        description: " Update Assigned Post",
        type: assigned_schema_1.AssignedTaskEntity,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_assigned_task_dto_1.UpdateAssignedTaskDto,
        user_schema_1.User]),
    __metadata("design:returntype", Promise)
], AssignedTasksController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.assignedRoute.finalrating),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssignedTasksController.prototype, "getFinalRating", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.assignedRoute.myCompTasks),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssignedTasksController.prototype, "getMyCompTasks", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.assignedRoute.compTaskByMe),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssignedTasksController.prototype, "completedByUser", null);
__decorate([
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "Post"),
    (0, common_1.Put)(constants_1.constTexts.assignedRoute.accept),
    (0, decorators_1.ApiPageOkResponse)({
        description: " Update Assigned Post",
        type: assigned_schema_1.AssignedTaskEntity,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], AssignedTasksController.prototype, "accepted", null);
exports.AssignedTasksController = AssignedTasksController = __decorate([
    (0, common_1.Controller)(constants_1.constTexts.assignedRoute.name),
    (0, swagger_1.ApiTags)(constants_1.constTexts.assignedRoute.name),
    __metadata("design:paramtypes", [assigned_tasks_service_1.AssignedTasksService,
        posts_service_1.PostsService])
], AssignedTasksController);
//# sourceMappingURL=assigned-tasks.controller.js.map