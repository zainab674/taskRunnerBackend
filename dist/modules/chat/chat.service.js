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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chat_entities_1 = require("./entities/chat.entities");
const exceptions_1 = require("../../exceptions");
const auth_service_1 = require("../auth/auth.service");
const chat_gateway_1 = require("./chat.gateway");
const user_service_1 = require("../user/user.service");
const notification_service_1 = require("../notification/notification.service");
let ChatService = class ChatService {
    constructor(chatModel, authService, userService, notificationService, chatGateway) {
        this.chatModel = chatModel;
        this.authService = authService;
        this.userService = userService;
        this.notificationService = notificationService;
        this.chatGateway = chatGateway;
    }
    async createChat(createchatDto, creator) {
        const userContent = {
            blockUserId: createchatDto.recipientId,
            userId: creator.id,
        };
        const findBlockUser = await this.userService.findBlockUser(userContent);
        if (findBlockUser && (findBlockUser === null || findBlockUser === void 0 ? void 0 : findBlockUser.block)) {
            throw new common_1.HttpException("You Blocked this contact. Please unblock to start conservation", common_1.HttpStatus.FORBIDDEN);
        }
        const create = new this.chatModel(createchatDto);
        const recipient = await this.authService.getUserSockets(createchatDto.recipientId);
        if (recipient) {
            const data = await create.save().catch((err) => {
                throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
            });
            if (data) {
                await this.chatGateway.createChat(data);
                const authorData = await this.userService.findOne({
                    _id: createchatDto.recipientId,
                });
                if (data) {
                    if (!authorData.isChatOpen) {
                        if (!findBlockUser || (findBlockUser === null || findBlockUser === void 0 ? void 0 : findBlockUser.notifications)) {
                            const content = {
                                category: "CHAT",
                                title: "New Message",
                                description: createchatDto.message,
                                id: data.id,
                                tokens: authorData.tokens,
                                userId: createchatDto.senderId,
                                allowPush: authorData.inPushMSG,
                                allowInApp: authorData.inAppMSG,
                                receiverId: createchatDto.recipientId,
                            };
                            const notifyData = {
                                userName: creator.name,
                                receiverName: authorData.name,
                                email: authorData.email,
                                notificationType: "CHAT",
                                allowTosend: authorData.inEmailMSG,
                            };
                            await this.notificationService.sendNotification(content, notifyData);
                        }
                    }
                }
            }
            return data;
        }
    }
    async findInbox(userId) {
        const data = await this.chatModel
            .aggregate([
            {
                $match: {
                    $or: [
                        { senderId: new mongoose_2.default.mongo.ObjectId(userId) },
                        { recipientId: new mongoose_2.default.mongo.ObjectId(userId) },
                    ],
                },
            },
            {
                $group: {
                    _id: null,
                    users: {
                        $addToSet: {
                            $cond: [
                                { $eq: ["$senderId", new mongoose_2.default.mongo.ObjectId(userId)] },
                                "$recipientId",
                                "$senderId",
                            ],
                        },
                    },
                },
            },
            {
                $project: {
                    users: {
                        $filter: {
                            input: "$users",
                            as: "user",
                            cond: { $ne: ["$$user", new mongoose_2.default.mongo.ObjectId(userId)] },
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "users",
                    foreignField: "_id",
                    as: "userDetails",
                },
            },
            {
                $unwind: "$userDetails",
            },
            {
                $lookup: {
                    from: "chats",
                    let: {
                        userId: new mongoose_2.default.mongo.ObjectId(userId),
                        conversationUserId: "$userDetails._id",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $or: [
                                        {
                                            $and: [
                                                { $eq: ["$senderId", "$$userId"] },
                                                { $eq: ["$recipientId", "$$conversationUserId"] },
                                            ],
                                        },
                                        {
                                            $and: [
                                                { $eq: ["$senderId", "$$conversationUserId"] },
                                                { $eq: ["$recipientId", "$$userId"] },
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            $sort: { createdAt: -1 },
                        },
                        {
                            $limit: 1,
                        },
                    ],
                    as: "lastMessage",
                },
            },
            {
                $project: {
                    userDetails: {
                        _id: 1,
                        name: 1,
                        avatar: 1,
                    },
                    lastMessage: { $arrayElemAt: ["$lastMessage", 0] },
                },
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
            data,
        };
    }
    async findDetail(id, userId) {
        const myProfile = await this.userService.findOne({
            _id: new mongoose_2.default.mongo.ObjectId(userId),
        });
        const otherProfile = await this.userService.findOne({
            _id: new mongoose_2.default.mongo.ObjectId(id),
        });
        const blockUserData = await this.userService.getBlockData(userId, id);
        const data = await this.chatModel
            .aggregate([
            {
                $match: {
                    $or: [
                        {
                            senderId: new mongoose_2.default.mongo.ObjectId(userId),
                            recipientId: new mongoose_2.default.mongo.ObjectId(id),
                        },
                        {
                            senderId: new mongoose_2.default.mongo.ObjectId(id),
                            recipientId: new mongoose_2.default.mongo.ObjectId(userId),
                        },
                    ],
                },
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "senderId",
                    foreignField: "_id",
                    as: "author",
                    pipeline: [
                        {
                            $project: {
                                _id: 1,
                                firstName: 1,
                                lastName: 1,
                                avatar: 1,
                                email: 1,
                            },
                        },
                    ],
                },
            },
            {
                $unwind: "$author",
            },
            {
                $lookup: {
                    from: "postentities",
                    let: { postId: "$postId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id", "$$postId"],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                title: { $ifNull: ["$title", ""] },
                            },
                        },
                    ],
                    as: "postName",
                },
            },
            {
                $unwind: {
                    path: "$postName",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    _id: 1,
                    message: 1,
                    postName: 1,
                    image: 1,
                    createdAt: 1,
                    isMine: {
                        $cond: [
                            { $eq: ["$senderId", new mongoose_2.default.mongo.ObjectId(userId)] },
                            true,
                            false,
                        ],
                    },
                    author: 1,
                },
            },
        ])
            .exec()
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        return {
            myProfile: {
                name: myProfile.name,
                avatar: myProfile.avatar,
                id: myProfile.id,
                email: myProfile.email,
            },
            otherProfile: {
                name: otherProfile.name,
                avatar: otherProfile.avatar,
                id: otherProfile.id,
                email: otherProfile.email,
                notification: !blockUserData ? true : blockUserData === null || blockUserData === void 0 ? void 0 : blockUserData.notifications,
                block: !blockUserData ? false : blockUserData === null || blockUserData === void 0 ? void 0 : blockUserData.block,
            },
            data,
        };
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chat_entities_1.Chat.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        auth_service_1.AuthService,
        user_service_1.UserService,
        notification_service_1.NotificationService,
        chat_gateway_1.ChatGateway])
], ChatService);
//# sourceMappingURL=chat.service.js.map