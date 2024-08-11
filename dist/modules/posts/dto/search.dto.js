"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const post_schema_1 = require("../schema/post.schema");
class SearchDto extends (0, swagger_1.PickType)(post_schema_1.PostEntity, [
    "title"
]) {
}
exports.SearchDto = SearchDto;
//# sourceMappingURL=search.dto.js.map