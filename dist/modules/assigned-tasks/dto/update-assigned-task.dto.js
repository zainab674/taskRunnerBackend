"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAssignedTaskDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const assigned_schema_1 = require("../schema/assigned.schema");
class UpdateAssignedTaskDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(assigned_schema_1.AssignedTaskEntity, [
    "ownerRating",
    "taskRunnerRating",
    "ownerReview",
    "taskRunnerRatingReview",
    "deadline"
])) {
}
exports.UpdateAssignedTaskDto = UpdateAssignedTaskDto;
//# sourceMappingURL=update-assigned-task.dto.js.map