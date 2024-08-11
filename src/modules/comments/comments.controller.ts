import { Controller, Post, Body, Get, Param, } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './schema/comments.schema';
import { Action } from 'src/casl/userRoles';
import { Auth, ApiPageOkResponse, AuthUser } from 'src/decorators';
import { User } from '../user/user.schema';
import { ApiTags } from '@nestjs/swagger';


@Controller("comments")
@ApiTags("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Auth(Action.Create, "comments")
  @Post()
  @ApiPageOkResponse({
    description: "Create Comment",
    type: CommentEntity,
  })
  async create(
    @AuthUser() user: User,
    @Body() commentDto: CreateCommentDto) {
    commentDto.userId = user.id
    return this.commentsService.create(commentDto);
  }

  @Get('mycomments/:id')
  async findAllByPostId(@Param('id') id: string) {
    return this.commentsService.commentsByMe(id);
  }
}
