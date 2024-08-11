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
import mongoose, { Document } from 'mongoose';
export type CommentDocument = CommentEntity & Document;
export declare class CommentEntity {
    content: string;
    userId: string;
    postId: string;
    parentCommentId: string;
    replies: CommentEntity[];
}
export declare const CommentSchema: mongoose.Schema<CommentEntity, mongoose.Model<CommentEntity, any, any, any, mongoose.Document<unknown, any, CommentEntity> & CommentEntity & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CommentEntity, mongoose.Document<unknown, {}, mongoose.FlatRecord<CommentEntity>> & mongoose.FlatRecord<CommentEntity> & {
    _id: mongoose.Types.ObjectId;
}>;
