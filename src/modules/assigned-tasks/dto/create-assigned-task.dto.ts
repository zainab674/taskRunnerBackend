import { PickType } from "@nestjs/swagger";
import { AssignedTaskEntity } from "../schema/assigned.schema";

export class CreateAssignedTaskDto extends PickType(AssignedTaskEntity, [

    "taskId",
    "taskRunnerId",

] as const) {
    OwnerId: string;

    isCompleted: boolean;
}
