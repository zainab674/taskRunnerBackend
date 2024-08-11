"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const comments_schema_1 = require("../schema/comments.schema");
class CreateCommentDto extends (0, swagger_1.PickType)(comments_schema_1.CommentEntity, [
    "content",
    "postId",
    "parentCommentId",
]) {
}
exports.CreateCommentDto = CreateCommentDto;
//# sourceMappingURL=create-comment.dto.js.map