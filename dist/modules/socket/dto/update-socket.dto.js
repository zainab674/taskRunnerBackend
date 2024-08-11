"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSocketDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_socket_dto_1 = require("./create-socket.dto");
class UpdateSocketDto extends (0, swagger_1.PartialType)(create_socket_dto_1.CreateSocketDto) {
}
exports.UpdateSocketDto = UpdateSocketDto;
//# sourceMappingURL=update-socket.dto.js.map