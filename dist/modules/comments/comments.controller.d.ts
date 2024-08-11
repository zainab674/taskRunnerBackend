import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from '../user/user.schema';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(user: User, commentDto: CreateCommentDto): Promise<import("./schema/comments.schema").CommentDocument>;
    findAllByPostId(id: string): Promise<any>;
}
