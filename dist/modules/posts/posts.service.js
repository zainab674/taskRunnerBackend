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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const post_schema_1 = require("./schema/post.schema");
const mongoose_2 = require("mongoose");
const exceptions_1 = require("../../exceptions");
const comments_schema_1 = require("../comments/schema/comments.schema");
let PostsService = class PostsService {
    constructor(schemaModel, commentModel) {
        this.schemaModel = schemaModel;
        this.commentModel = commentModel;
    }
    async create(createDto) {
        const create = new this.schemaModel(createDto);
        return await create.save().catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
    }
    async findall(page = 1, limit = 20) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const totalCount = await this.schemaModel.find().exec();
        const totalPages = Math.ceil(totalCount.length / limit);
        const data = await this.schemaModel
            .aggregate([
            {
                $skip: startIndex,
            },
            {
                $limit: endIndex,
            },
        ])
            .exec()
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        return {
            totalCount: totalCount.length,
            totalPages: totalPages,
            data: data,
        };
    }
    async findById(postId) {
        return this.schemaModel
            .findById(postId).exec();
    }
    async update(id, updateDataDto, cid) {
        try {
            const verify = await this.schemaModel.findById(id);
            if (!verify) {
                throw new common_1.HttpException('Post not found', exceptions_1.ResponseCode.NOT_FOUND);
            }
            if (verify.userId.toString() !== cid) {
                throw new common_1.HttpException('Unauthorized', exceptions_1.ResponseCode.UNAUTHORIZED);
            }
            if (updateDataDto.location && updateDataDto.location.coordinates) {
                updateDataDto.location.type = 'Point';
            }
            const updateData = await this.schemaModel
                .findByIdAndUpdate(id, updateDataDto, { new: true })
                .exec();
            return { data: updateData };
        }
        catch (err) {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        }
    }
    async findMy(id) {
        try {
            const data = await this.schemaModel.find({ userId: id }).exec();
            console.log(data);
            return {
                data,
            };
        }
        catch (err) {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        }
    }
    async getWithinRadius(locationDto) {
        const pipeline = [];
        const radius = locationDto.radius;
        const [longitude, latitude] = locationDto.location.coordinates;
        pipeline.push({
            $match: {
                location: {
                    $geoWithin: {
                        $centerSphere: [
                            [longitude, latitude],
                            radius / 6371.1,
                        ],
                    },
                },
            },
        });
        const events = await this.schemaModel.aggregate(pipeline);
        console.log(events);
        if (events) {
            return events;
        }
        else {
            throw new common_1.HttpException("no post found", exceptions_1.ResponseCode.BAD_REQUEST);
        }
    }
    async filterEvents(filterDto) {
        const isUrgent = filterDto.isUrgent;
        const isFree = filterDto.isFree;
        const isCompleted = filterDto.isCompleted;
        const location = filterDto.location;
        const radius = filterDto.radius;
        const pipeline = [];
        if (location && location.coordinates && radius) {
            const [longitude, latitude] = location.coordinates;
            pipeline.push({
                $match: {
                    location: {
                        $geoWithin: {
                            $centerSphere: [
                                [longitude, latitude],
                                radius / 6371.1,
                            ],
                        },
                    },
                },
            });
        }
        if (isUrgent) {
            pipeline.push({ $match: { isUrgent }, });
        }
        if (isFree) {
            pipeline.push({ $match: { isFree }, });
        }
        if (isCompleted) {
            pipeline.push({ $match: { isCompleted } });
        }
        const events = await this.schemaModel.aggregate(pipeline);
        if (events) {
            return events;
        }
        else {
            throw new common_1.HttpException("no post found", exceptions_1.ResponseCode.BAD_REQUEST);
        }
    }
    async completed(id, cid) {
        try {
            const verify = await this.schemaModel.findById(id);
            if (!verify) {
                throw new common_1.HttpException('Post not found', exceptions_1.ResponseCode.NOT_FOUND);
            }
            if (verify.userId.toString() !== cid) {
                throw new common_1.HttpException('Unauthorized', exceptions_1.ResponseCode.UNAUTHORIZED);
            }
            const isCompleted = true;
            const updateData = await this.schemaModel
                .findByIdAndUpdate(id, { isCompleted }, { new: true })
                .exec();
            return { data: updateData };
        }
        catch (err) {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        }
    }
    async searchEvents(searchDto) {
        const name = searchDto.title;
        const events = await this.schemaModel.aggregate([
            {
                $match: {
                    title: { $regex: `.*${name}.*`, $options: "i" },
                },
            },
        ]);
        if (events) {
            return events;
        }
        else {
            throw new common_1.HttpException("no post found", exceptions_1.ResponseCode.BAD_REQUEST);
        }
    }
    async deletePost(id) {
        return await this.schemaModel
            .findByIdAndDelete(id)
            .exec()
            .catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
    }
    async getPostWithAllComments(postId) {
        const post = await this.schemaModel.findById(postId).exec();
        if (!post) {
            return null;
        }
        const commentsWithReplies = await this.commentModel.aggregate([
            { $match: { postId: new mongoose_2.default.Types.ObjectId(postId), parentCommentId: null } },
            {
                $graphLookup: {
                    from: 'commententities',
                    startWith: '$_id',
                    connectFromField: '_id',
                    connectToField: 'parentCommentId',
                    as: 'allReplies',
                    depthField: 'depth',
                }
            },
            {
                $addFields: {
                    replies: {
                        $filter: {
                            input: '$allReplies',
                            as: 'reply',
                            cond: { $eq: ['$$reply.parentCommentId', '$_id'] }
                        }
                    }
                }
            },
            {
                $addFields: {
                    replies: {
                        $function: {
                            body: function (replies, allReplies) {
                                const nestReplies = (comments) => {
                                    comments.forEach(comment => {
                                        comment.replies = allReplies.filter(reply => String(reply.parentCommentId) === String(comment._id));
                                        nestReplies(comment.replies);
                                    });
                                    return comments;
                                };
                                return nestReplies(replies);
                            },
                            args: ['$replies', '$allReplies'],
                            lang: 'js'
                        }
                    }
                }
            },
            {
                $project: {
                    content: 1,
                    userId: 1,
                    postId: 1,
                    replies: 1,
                    _id: 1
                }
            }
        ]).exec();
        return Object.assign(Object.assign({}, post.toObject()), { comments: commentsWithReplies });
    }
    async findByUserId(id) {
        const post = await this.schemaModel.find({ userId: id }).exec();
        return post;
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.PostEntity.name)),
    __param(1, (0, mongoose_1.InjectModel)(comments_schema_1.CommentEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PostsService);
//# sourceMappingURL=posts.service.js.map