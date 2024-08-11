"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_schema_1 = require("../../user/user.schema");
class UserLoginDto extends (0, swagger_1.PickType)(user_schema_1.User, [
    "email",
    "password",
]) {
}
exports.UserLoginDto = UserLoginDto;
//# sourceMappingURL=user.login.dto.js.map