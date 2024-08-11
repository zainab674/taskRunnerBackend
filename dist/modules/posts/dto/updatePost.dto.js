"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const post_schema_1 = require("../schema/post.schema");
class UpdatePostDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(post_schema_1.PostEntity, [
    "title",
    "description",
    "images",
    "city",
    "state",
    "zipcode",
    "street",
    "price",
    "isUrgent",
    "isFree",
    "obo",
    "location",
    "isCompleted",
])) {
}
exports.UpdatePostDto = UpdatePostDto;
//# sourceMappingURL=updatePost.dto.js.map