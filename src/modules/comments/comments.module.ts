import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentEntity, CommentSchema } from './schema/comments.schema';

@Module({
  imports: [

    MongooseModule.forFeature([{ name: CommentEntity.name, schema: CommentSchema }]),

  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule { }
