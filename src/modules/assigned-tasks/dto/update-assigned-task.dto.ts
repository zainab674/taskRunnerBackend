import { PartialType, PickType } from '@nestjs/swagger';

import { AssignedTaskEntity } from '../schema/assigned.schema';

export class UpdateAssignedTaskDto extends PartialType(PickType(AssignedTaskEntity, [
    "ownerRating",
    "taskRunnerRating",
    "ownerReview",
    "taskRunnerRatingReview",
    "deadline"
] as const)
)
{ isCompleted: boolean; }
