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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const review_entity_1 = require("./entities/review.entity");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const exceptions_1 = require("../../exceptions");
const posts_service_1 = require("../posts/posts.service");
let ReviewsService = class ReviewsService {
    constructor(reviewModel, postsService) {
        this.reviewModel = reviewModel;
        this.postsService = postsService;
    }
    async create(createReviewDto) {
        const create = new this.reviewModel(createReviewDto);
        const saved = await create.save().catch((err) => {
            throw new common_1.HttpException(err.message, exceptions_1.ResponseCode.BAD_REQUEST);
        });
        if (saved) {
            const updated = await this.postsService.MaarkAsComplete(createReviewDto.postId, createReviewDto.writerId);
            if (updated) {
                return saved;
            }
        }
    }
    findAll() {
        return `This action returns all reviews`;
    }
    findOne(id) {
        return `This action returns a #${id} review`;
    }
    update(id, updateReviewDto) {
        return `This action updates a #${id} review`;
    }
    remove(id) {
        return `This action removes a #${id} review`;
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(review_entity_1.Review.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        posts_service_1.PostsService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map