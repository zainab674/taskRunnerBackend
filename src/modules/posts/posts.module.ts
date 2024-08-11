import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "../user/user.module";
import { PostEntity, PostSchema } from "./schema/post.schema";

import { HttpModule } from "@nestjs/axios";
import { CommentEntity, CommentSchema } from "../comments/schema/comments.schema";
import { CommentsController } from "../comments/comments.controller";
import { CommentsService } from "../comments/comments.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PostEntity.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: CommentEntity.name, schema: CommentSchema }]),
    UserModule,
    HttpModule,
  ],
  controllers: [PostsController, CommentsController],
  providers: [PostsService, CommentsService],
  exports: [PostsService],
})
export class PostsModule { }
