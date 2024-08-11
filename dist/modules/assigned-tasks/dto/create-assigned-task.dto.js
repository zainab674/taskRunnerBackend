"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAssignedTaskDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const assigned_schema_1 = require("../schema/assigned.schema");
class CreateAssignedTaskDto extends (0, swagger_1.PickType)(assigned_schema_1.AssignedTaskEntity, [
    "taskId",
    "taskRunnerId",
]) {
}
exports.CreateAssignedTaskDto = CreateAssignedTaskDto;
//# sourceMappingURL=create-assigned-task.dto.js.map