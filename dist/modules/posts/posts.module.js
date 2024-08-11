"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const posts_controller_1 = require("./posts.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("../user/user.module");
const post_schema_1 = require("./schema/post.schema");
const axios_1 = require("@nestjs/axios");
const comments_schema_1 = require("../comments/schema/comments.schema");
const comments_controller_1 = require("../comments/comments.controller");
const comments_service_1 = require("../comments/comments.service");
let PostsModule = class PostsModule {
};
exports.PostsModule = PostsModule;
exports.PostsModule = PostsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: post_schema_1.PostEntity.name, schema: post_schema_1.PostSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: comments_schema_1.CommentEntity.name, schema: comments_schema_1.CommentSchema }]),
            user_module_1.UserModule,
            axios_1.HttpModule,
        ],
        controllers: [posts_controller_1.PostsController, comments_controller_1.CommentsController],
        providers: [posts_service_1.PostsService, comments_service_1.CommentsService],
        exports: [posts_service_1.PostsService],
    })
], PostsModule);
//# sourceMappingURL=posts.module.js.map