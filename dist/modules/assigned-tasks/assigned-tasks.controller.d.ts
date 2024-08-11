/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { AssignedTasksService } from './assigned-tasks.service';
import { CreateAssignedTaskDto } from './dto/create-assigned-task.dto';
import { AssignedTaskEntity } from './schema/assigned.schema';
import { User } from '../user/user.schema';
import { UpdateAssignedTaskDto } from './dto/update-assigned-task.dto';
import { PostsService } from '../posts/posts.service';
export declare class AssignedTasksController {
    private readonly assignedTasksService;
    private postService;
    constructor(assignedTasksService: AssignedTasksService, postService: PostsService);
    create(user: User, createAssignedTaskDto: CreateAssignedTaskDto): Promise<import("./schema/assigned.schema").AssignedTaskDocument>;
    ownerAssigns(user: User): Promise<(import("mongoose").Document<unknown, {}, import("./schema/assigned.schema").AssignedTaskDocument> & AssignedTaskEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    runnerAssigns(user: User): Promise<(import("mongoose").Document<unknown, {}, import("./schema/assigned.schema").AssignedTaskDocument> & AssignedTaskEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    remove(id: string, user: User): Promise<{
        message: string;
    }>;
    update(id: string, updateAssignedTaskDto: UpdateAssignedTaskDto, user: User): Promise<{
        result: {
            data: import("mongoose").Document<unknown, {}, import("./schema/assigned.schema").AssignedTaskDocument> & AssignedTaskEntity & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
        };
        res: {
            data: import("mongoose").Document<unknown, {}, import("../posts/schema/post.schema").PostDocument> & import("../posts/schema/post.schema").PostEntity & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
        };
    }>;
    getFinalRating(userId: string): Promise<{
        averageOwnerRating: number;
        averageTaskRunnerRating: number;
    }>;
    getMyCompTasks(userId: string): Promise<any>;
    completedByUser(userId: string): Promise<any>;
    accepted(id: string, user: User): Promise<{
        res: {
            data: import("mongoose").Document<unknown, {}, import("../posts/schema/post.schema").PostDocument> & import("../posts/schema/post.schema").PostEntity & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
        };
    }>;
}
