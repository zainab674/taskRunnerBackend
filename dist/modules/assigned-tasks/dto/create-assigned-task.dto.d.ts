import { AssignedTaskEntity } from "../schema/assigned.schema";
declare const CreateAssignedTaskDto_base: import("@nestjs/common").Type<Pick<AssignedTaskEntity, "taskId" | "taskRunnerId">>;
export declare class CreateAssignedTaskDto extends CreateAssignedTaskDto_base {
    OwnerId: string;
    isCompleted: boolean;
}
export {};
