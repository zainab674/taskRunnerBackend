"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyAccountDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_schema_1 = require("../../user/user.schema");
class VerifyAccountDto extends (0, swagger_1.PickType)(user_schema_1.User, [
    "otp",
    "email",
]) {
}
exports.VerifyAccountDto = VerifyAccountDto;
//# sourceMappingURL=verify-account.dto.js.map