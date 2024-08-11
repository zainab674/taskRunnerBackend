"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const permission_schema_1 = require("../permission.schema");
class PermissionDto extends (0, swagger_1.PartialType)(permission_schema_1.Permission) {
}
exports.PermissionDto = PermissionDto;
//# sourceMappingURL=permission.dto.js.map