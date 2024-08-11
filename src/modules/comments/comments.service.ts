import { HttpException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentEntity, CommentDocument } from './schema/comments.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {


  constructor(
    @InjectModel(CommentEntity.name) private commentModel: Model<CommentDocument>,
  ) { }


  async create(commentDto: CreateCommentDto): Promise<CommentDocument> {
    const comment = new this.commentModel(commentDto);
    return comment.save();
  }

  async commentsByMe(id: string): Promise<any> {
    try {

      const comments = await this.commentModel.find({ userId: id }).exec();

      if (comments.length === 0) {
        throw new HttpException('No comments found for the user', 404);
      }

      return comments;
    } catch (err) {
      throw new HttpException(err.message, 500);
    }
  }

  async deleteComment(id: string): Promise<{ message: string }> {
    try {
      await this.commentModel.findByIdAndDelete(id);
      await this.commentModel.deleteMany({ parentCommentId: id })


      return { message: 'Comment and its replies deleted successfully' };
    } catch (err) {
      throw new HttpException(err.message, 500);
    }
  }

}
