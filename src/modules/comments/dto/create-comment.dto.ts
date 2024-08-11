import { PickType } from "@nestjs/swagger";
import { CommentEntity } from "../schema/comments.schema";


export class CreateCommentDto extends PickType(CommentEntity, [
    "content",
    "postId",
    "parentCommentId",

])
{

    userId: string
}
