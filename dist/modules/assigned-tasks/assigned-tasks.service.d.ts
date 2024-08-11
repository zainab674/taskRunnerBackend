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
/// <reference types="mongoose/types/inferschematype" />
import { CreateAssignedTaskDto } from './dto/create-assigned-task.dto';
import { UpdateAssignedTaskDto } from './dto/update-assigned-task.dto';
import { Model } from 'mongoose';
import { AssignedTaskEntity, AssignedTaskDocument } from './schema/assigned.schema';
import { PostsService } from '../posts/posts.service';
export declare class AssignedTasksService {
    private schemaModel;
    private postService;
    constructor(schemaModel: Model<AssignedTaskDocument>, postService: PostsService);
    create(createAssignedTaskDto: CreateAssignedTaskDto): Promise<AssignedTaskDocument>;
    ownerAssigns(id: string): Promise<(import("mongoose").Document<unknown, {}, AssignedTaskDocument> & AssignedTaskEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    runnerAssigns(id: string): Promise<(import("mongoose").Document<unknown, {}, AssignedTaskDocument> & AssignedTaskEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    update(id: string, updateAssignedTaskDto: UpdateAssignedTaskDto, userId: string): Promise<{
        data: import("mongoose").Document<unknown, {}, AssignedTaskDocument> & AssignedTaskEntity & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
    getFinalRating(userId: string): Promise<{
        averageOwnerRating: number;
        averageTaskRunnerRating: number;
    }>;
    getReviews(userId: string): Promise<any>;
    accepted(id: string, cid: string): Promise<{
        data: import("mongoose").Document<unknown, {}, AssignedTaskDocument> & AssignedTaskEntity & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    completedByUser(id: string): Promise<any>;
    completedForUser(id: string): Promise<any>;
}
