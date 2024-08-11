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
export type NotifyDocument = Notify & Document;
export declare class Notify {
    id: string;
    userId: string;
    receiverId: string;
    read: boolean;
    category: string;
    postId: string;
}
declare const NotifySchema: mongoose.Schema<Notify, mongoose.Model<Notify, any, any, any, mongoose.Document<unknown, any, Notify> & Notify & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Notify, mongoose.Document<unknown, {}, mongoose.FlatRecord<Notify>> & mongoose.FlatRecord<Notify> & {
    _id: mongoose.Types.ObjectId;
}>;
export { NotifySchema };
export declare const userJsonSchema: Record<string, import("openapi3-ts").SchemaObject>;
