import { CommentEntity } from "../schema/comments.schema";
declare const CreateCommentDto_base: import("@nestjs/common").Type<Pick<CommentEntity, "content" | "postId" | "parentCommentId">>;
export declare class CreateCommentDto extends CreateCommentDto_base {
    userId: string;
}
export {};
