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
exports.AssignedTasksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const assigned_schema_1 = require("./schema/assigned.schema");
const exceptions_1 = require("../../exceptions");
const posts_service_1 = require("../posts/posts.service");
let AssignedTasksService = class AssignedTasksService {
    constructor(schemaModel, postService) {
        this.schemaModel = schemaModel;
        this.postService = postService;
    }
    async create(createAssignedTaskDto) {
        const task = await this.postService.findById(createAssignedTaskDto.taskId);
        if (!task) {
            throw new common_1.HttpException("Task not found", exceptions_1.ResponseCode.NOT_FOUND);
        }
        if (task.userId.toString() !== createAssignedTaskDto.OwnerId) {
            throw new common_1.HttpException("Unauthorized", exceptions_1.ResponseCode.UNAUTHORIZED);
        }
        if (task.isCompleted) {
            throw new common_1.HttpException("Task already completed", exceptions_1.ResponseCode.BAD_REQUEST);
        }
        createAssignedTaskDto.isCompleted = task.isCompleted;
        const already = await this.schemaModel.findOne({ taskId: createAssignedTaskDto.taskId }).exec();
        console.log(already);
        if (already) {
            throw new common_1.HttpException("Task already assigned", exceptions_1.ResponseCode.BAD_REQUEST);
        }
        const createTask = new this.schemaModel(createAssignedTaskDto);
        return await createTask.save().catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
    }
    async ownerAssigns(id) {
        const data = await this.schemaModel.find({ OwnerId: id });
        if (data) {
            return data;
        }
        else {
            throw new common_1.HttpException("No Tasks Assigned", exceptions_1.ResponseCode.BAD_REQUEST);
        }
    }
    async runnerAssigns(id) {
        const data = await this.schemaModel.find({ taskRunnerId: id });
        if (data) {
            return data;
        }
        else {
            throw new common_1.HttpException("No Tasks Assigned To Me", exceptions_1.ResponseCode.BAD_REQUEST);
        }
    }
    async update(id, updateAssignedTaskDto, userId) {
        try {
            const verify = await this.schemaModel.findOne({ taskId: id });
            if (!verify) {
                throw new common_1.HttpException('Post not found', exceptions_1.ResponseCode.NOT_FOUND);
            }
            if (verify.OwnerId.toString() !== userId) {
                throw new common_1.HttpException("Unauthorized", exceptions_1.ResponseCode.UNAUTHORIZED);
            }
            updateAssignedTaskDto.isCompleted = true;
            const updateData = await this.schemaModel
                .findByIdAndUpdate(verify.id, updateAssignedTaskDto, { new: true })
                .exec();
            return { data: updateData };
        }
        catch (err) {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        }
    }
    async remove(id, userId) {
        const verify = await this.schemaModel.findOne({ taskId: id }).exec();
        if (!verify) {
            throw new common_1.HttpException("Document not found", exceptions_1.ResponseCode.NOT_FOUND);
        }
        if (verify.OwnerId.toString() !== userId) {
            throw new common_1.HttpException("Unauthorized", exceptions_1.ResponseCode.UNAUTHORIZED);
        }
        await this.schemaModel.deleteOne({ taskId: id }).exec();
        return { message: "Successfully deleted" };
    }
    async getFinalRating(userId) {
        try {
            const tasks = await this.schemaModel.find({
                $or: [{ OwnerId: userId }, { taskRunnerId: userId }]
            }).exec();
            if (tasks.length === 0) {
                throw new common_1.HttpException("No tasks found for the user", 404);
            }
            let totalOwnerRating = 0;
            let totalTaskRunnerRating = 0;
            let ownerRatingCount = 0;
            let taskRunnerRatingCount = 0;
            tasks.forEach(task => {
                if (task.OwnerId.toString() === userId && task.ownerRating) {
                    totalOwnerRating += task.ownerRating;
                    ownerRatingCount++;
                }
                if (task.taskRunnerId.toString() === userId && task.taskRunnerRating) {
                    totalTaskRunnerRating += task.taskRunnerRating;
                    taskRunnerRatingCount++;
                }
            });
            const averageOwnerRating = ownerRatingCount > 0 ? totalOwnerRating / ownerRatingCount : 0;
            const averageTaskRunnerRating = taskRunnerRatingCount > 0 ? totalTaskRunnerRating / taskRunnerRatingCount : 0;
            return {
                averageOwnerRating,
                averageTaskRunnerRating,
            };
        }
        catch (err) {
            throw new common_1.HttpException(err.message, 500);
        }
    }
    async getReviews(userId) {
        try {
            const tasks = await this.schemaModel.find({
                taskRunnerId: userId
            }).exec();
            if (tasks.length === 0) {
                throw new common_1.HttpException('No tasks found for the user', 404);
            }
            const reviews = tasks.map(task => ({
                userId: task.OwnerId,
                taskRunnerRatingReview: task.taskRunnerRatingReview
            }));
            if (reviews.length === 0) {
                throw new common_1.HttpException('No reviews found for the user', 404);
            }
            return reviews;
        }
        catch (err) {
            throw new common_1.HttpException(err.message, 500);
        }
    }
    async accepted(id, cid) {
        try {
            const verify = await this.schemaModel.findById(id);
            if (!verify) {
                throw new common_1.HttpException('Post not found', exceptions_1.ResponseCode.NOT_FOUND);
            }
            if (verify.taskRunnerId.toString() !== cid) {
                throw new common_1.HttpException('Unauthorized', exceptions_1.ResponseCode.UNAUTHORIZED);
            }
            const accepted = true;
            const updateData = await this.schemaModel
                .findByIdAndUpdate(id, { accepted }, { new: true })
                .exec();
            return { data: updateData };
        }
        catch (err) {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        }
    }
    async completedByUser(id) {
        try {
            const completedTasks = await this.schemaModel.find({
                taskRunnerId: id,
                isCompleted: true,
            }).exec();
            if (completedTasks.length === 0) {
                throw new common_1.HttpException('No completed tasks by the user', 404);
            }
            return completedTasks;
        }
        catch (err) {
            throw new common_1.HttpException(err.message, 500);
        }
    }
    async completedForUser(id) {
        try {
            const completedTasks = await this.schemaModel.find({
                OwnerId: id,
                isCompleted: true,
            }).exec();
            if (completedTasks.length === 0) {
                throw new common_1.HttpException('No completed tasks found for the user', 404);
            }
            return completedTasks;
        }
        catch (err) {
            throw new common_1.HttpException(err.message, 500);
        }
    }
};
exports.AssignedTasksService = AssignedTasksService;
exports.AssignedTasksService = AssignedTasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(assigned_schema_1.AssignedTaskEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        posts_service_1.PostsService])
], AssignedTasksService);
//# sourceMappingURL=assigned-tasks.service.js.map