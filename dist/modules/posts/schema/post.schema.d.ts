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
import mongoose, { Document } from "mongoose";
import { CommentEntity } from "src/modules/comments/schema/comments.schema";
export type PostDocument = PostEntity & Document;
export declare class PostEntity {
    id: string;
    userId: string;
    title: string;
    description: string;
    images: string[];
    city: string;
    state: string;
    zipcode: string;
    street: string;
    price: number;
    isUrgent: boolean;
    isFree: boolean;
    obo: boolean;
    isCompleted: boolean;
    location: {
        type: String;
        coordinates: [number, number];
        required: true;
    };
    comments: CommentEntity[];
}
declare const PostSchema: mongoose.Schema<PostEntity, mongoose.Model<PostEntity, any, any, any, mongoose.Document<unknown, any, PostEntity> & PostEntity & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, PostEntity, mongoose.Document<unknown, {}, mongoose.FlatRecord<PostEntity>> & mongoose.FlatRecord<PostEntity> & {
    _id: mongoose.Types.ObjectId;
}>;
export { PostSchema };
export declare const userJsonSchema: Record<string, import("openapi3-ts").SchemaObject>;
