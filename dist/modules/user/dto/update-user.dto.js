"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_schema_1 = require("../user.schema");
class UpdateUserDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(user_schema_1.User, ["role", "otp", "isOtpUsed", "verify", "status"])) {
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=update-user.dto.js.map