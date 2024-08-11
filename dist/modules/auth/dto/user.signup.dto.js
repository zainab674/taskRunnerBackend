"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSignupDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_schema_1 = require("../../user/user.schema");
class UserSignupDto extends (0, swagger_1.PickType)(user_schema_1.User, [
    "fullName",
    "email",
    "password",
    "city",
]) {
}
exports.UserSignupDto = UserSignupDto;
//# sourceMappingURL=user.signup.dto.js.map