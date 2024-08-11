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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const constants_1 = require("../../constants");
const swagger_1 = require("@nestjs/swagger");
const post_schema_1 = require("./schema/post.schema");
const user_schema_1 = require("../user/user.schema");
const decorators_1 = require("../../decorators");
const userRoles_1 = require("../../casl/userRoles");
const updatePost_dto_1 = require("./dto/updatePost.dto");
const multi_upload_interceptor_1 = require("../../interceptors/multi-upload.interceptor");
const createPost_dto_1 = require("./dto/createPost.dto");
const location_dto_1 = require("./dto/location.dto");
const filterPost_dto_1 = require("./dto/filterPost.dto");
const search_dto_1 = require("./dto/search.dto");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    async create(user, images, createDto) {
        createDto.userId = user.id;
        createDto.images = images.map(image => image.destination + image.filename);
        if (typeof createDto.location === 'string') {
            createDto.location = JSON.parse(createDto.location);
        }
        console.log(createDto);
        return this.postsService.create(createDto);
    }
    async update(user, id, images, updateDatato) {
        if (typeof updateDatato.location === 'string') {
            updateDatato.location = JSON.parse(updateDatato.location);
        }
        console.log(updateDatato);
        const cid = user.id;
        return this.postsService.update(id, updateDatato, cid);
    }
    findall(page = 1, limit = 20) {
        return this.postsService.findall(page, limit);
    }
    async findMy(user) {
        const id = user.id;
        return this.postsService.findMy(id);
    }
    async findById(id) {
        return this.postsService.getPostWithAllComments(id);
    }
    async findUP(id) {
        console.log(id);
        return this.postsService.findMy(id);
    }
    async deletePost(id) {
        return this.postsService.deletePost(id);
    }
    async getWithinRadius(locationDto) {
        return await this.postsService.getWithinRadius(locationDto);
    }
    async filteredPosts(filterDto) {
        return await this.postsService.filterEvents(filterDto);
    }
    async searchedPosts(searchDto) {
        return await this.postsService.searchEvents(searchDto);
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "Post"),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, multi_upload_interceptor_1.MultipleFileUpload)('images', 10)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Create Post",
        type: post_schema_1.PostEntity,
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User,
        Array,
        createPost_dto_1.CreatePost]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "create", null);
__decorate([
    (0, decorators_1.Auth)(userRoles_1.Action.Update, "Post"),
    (0, common_1.Put)(constants_1.constTexts.postRoute.update),
    (0, common_1.UseInterceptors)((0, multi_upload_interceptor_1.MultipleFileUpload)('images', 10)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Update Post",
        type: post_schema_1.PostEntity,
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.UploadedFiles)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, String, Array,
        updatePost_dto_1.UpdatePostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.postRoute.getAllPosts),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get all List",
        type: post_schema_1.PostEntity,
    }),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findall", null);
__decorate([
    (0, decorators_1.Auth)(userRoles_1.Action.Read, "Post"),
    (0, common_1.Get)(constants_1.constTexts.postRoute.my),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get My List",
        type: post_schema_1.PostEntity,
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findMy", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.postRoute.specific),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get POST",
        type: post_schema_1.PostEntity,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.postRoute.users),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get Users List",
        type: post_schema_1.PostEntity,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findUP", null);
__decorate([
    (0, common_1.Delete)(constants_1.constTexts.postRoute.delete),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Delete Post",
        type: post_schema_1.PostEntity,
    }),
    (0, decorators_1.Auth)(userRoles_1.Action.Update, "Post"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deletePost", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)(constants_1.constTexts.postRoute.withinRadius),
    (0, decorators_1.ApiPageOkResponse)({ type: Event, description: "Successfully Fetched" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [location_dto_1.LocationDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getWithinRadius", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)(constants_1.constTexts.postRoute.filter),
    (0, decorators_1.ApiPageOkResponse)({ type: Event, description: "Successfully Fetched" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filterPost_dto_1.FilterDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "filteredPosts", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)(constants_1.constTexts.postRoute.search),
    (0, decorators_1.ApiPageOkResponse)({ type: Event, description: "Successfully Fetched" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_dto_1.SearchDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "searchedPosts", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)(constants_1.constTexts.postRoute.name),
    (0, swagger_1.ApiTags)(constants_1.constTexts.postRoute.name),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map