"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoicalAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_schema_1 = require("../../user/user.schema");
class SoicalAuthDto extends (0, swagger_1.PickType)(user_schema_1.User, [
    "name",
    "email",
    "password",
    "city",
    "tokens",
]) {
}
exports.SoicalAuthDto = SoicalAuthDto;
//# sourceMappingURL=social-auth.dto.js.map