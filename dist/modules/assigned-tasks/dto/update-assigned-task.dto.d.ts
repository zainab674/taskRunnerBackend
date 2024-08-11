import { AssignedTaskEntity } from '../schema/assigned.schema';
declare const UpdateAssignedTaskDto_base: import("@nestjs/common").Type<Partial<Pick<AssignedTaskEntity, "ownerRating" | "taskRunnerRating" | "ownerReview" | "taskRunnerRatingReview" | "deadline">>>;
export declare class UpdateAssignedTaskDto extends UpdateAssignedTaskDto_base {
    isCompleted: boolean;
}
export {};
