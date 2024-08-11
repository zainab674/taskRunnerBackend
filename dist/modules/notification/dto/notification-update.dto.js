"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNotifyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const notification_entity_1 = require("../entity/notification.entity");
class UpdateNotifyDto extends (0, swagger_1.PartialType)(notification_entity_1.Notify) {
}
exports.UpdateNotifyDto = UpdateNotifyDto;
//# sourceMappingURL=notification-update.dto.js.map