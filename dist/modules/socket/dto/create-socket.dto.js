"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSocketDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const socket_schema_1 = require("../socket.schema");
class CreateSocketDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(socket_schema_1.Socket, [
    "recepientId",
    "message",
    "senderId",
    "image"
])) {
}
exports.CreateSocketDto = CreateSocketDto;
//# sourceMappingURL=create-socket.dto.js.map