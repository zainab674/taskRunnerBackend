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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const constants_1 = require("../../constants");
const app_config_1 = require("../../configuration/app.config");
const mongoose_1 = require("@nestjs/mongoose");
const notification_entity_1 = require("./entity/notification.entity");
const exceptions_1 = require("../../exceptions");
const mongoose_2 = require("mongoose");
const mail_service_1 = require("../mail/mail.service");
const notify_gateway_1 = require("./notify.gateway");
let NotificationService = class NotificationService {
    constructor(notifyModel, sendMail, notifyGateway) {
        this.notifyModel = notifyModel;
        this.sendMail = sendMail;
        this.notifyGateway = notifyGateway;
    }
    async sendNotification(content, notifyData) {
        const message = {
            registration_ids: content.tokens,
            notification: {
                title: content.title,
                body: content.description,
                category: content.category,
                id: content.id,
            },
        };
        const headers = {
            "Content-Type": "application/json",
            Authorization: `key=${app_config_1.AppConfig.firebaseServerKeyConfig.firebaseServerKey}`,
        };
        const create = new this.notifyModel({
            userId: content.userId,
            parentId: content.id,
            category: content.category,
            postId: content === null || content === void 0 ? void 0 : content.postId,
            receiverId: content.receiverId,
        });
        if (notifyData.allowTosend) {
            this.sendMail.notificationEmail(notifyData);
        }
        if (content.allowInApp) {
            const saved = await create.save().catch((err) => {
                throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
            });
            if (saved) {
                const chatCount = await this.totalChatCount(content.userId);
                const otherNotifyCount = await this.totalCount(content.userId);
                if (chatCount) {
                    this.notifyGateway.sendChatNotificationCount(chatCount.data);
                }
                if (otherNotifyCount) {
                    this.notifyGateway.sendNotificationCount(otherNotifyCount.data);
                }
            }
        }
        if (content.tokens.length > 0 && content.allowPush) {
            return await axios_1.default.post(constants_1.FCM_ENDPOINT, message, { headers });
        }
    }
    async findall(userId, page = 1, limit = 10) {
        const totalCount = await this.notifyModel.find({ userId: userId });
        const totalPages = Math.ceil(totalCount.length / limit);
        const data = await this.notifyModel
            .aggregate([
            {
                $match: {
                    receiverId: new mongoose_2.default.mongo.ObjectId(userId),
                    category: { $ne: "CHAT" },
                },
            },
            {
                $limit: 20,
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "authorUser",
                    pipeline: [
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                avatar: 1,
                            },
                        },
                    ],
                },
            },
            {
                $unwind: "$authorUser",
            },
            {
                $sort: { createdAt: -1 },
            },
        ])
            .exec()
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        return {
            totalCount: totalCount.length,
            totalPages,
            currentPage: Number(page),
            data,
        };
    }
    async totalCount(userId) {
        const data = await this.notifyModel
            .aggregate([
            {
                $match: {
                    receiverId: new mongoose_2.default.mongo.ObjectId(userId),
                    read: false,
                    category: { $ne: "CHAT" },
                },
            },
        ])
            .exec()
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        return {
            data: data.length,
        };
    }
    async totalChatCount(userId) {
        const data = await this.notifyModel
            .aggregate([
            {
                $match: {
                    receiverId: new mongoose_2.default.mongo.ObjectId(userId),
                    read: false,
                    category: "CHAT",
                },
            },
        ])
            .exec()
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        return {
            data: data.length,
        };
    }
    async update(id, updateDto) {
        return await this.notifyModel
            .findByIdAndUpdate(id, updateDto, {
            new: true,
        })
            .exec()
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
    }
    async updateChatNoti(id, updateDto) {
        return await this.notifyModel
            .updateMany({ userId: new mongoose_2.default.mongo.ObjectId(id) }, updateDto, {
            new: true,
        })
            .exec()
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notification_entity_1.Notify.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mail_service_1.MailService,
        notify_gateway_1.NotifyGateway])
], NotificationService);
//# sourceMappingURL=notification.service.js.map