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
import { PostDocument, PostEntity } from "./schema/post.schema";
import mongoose, { Model } from "mongoose";
import { UpdatePostDto } from "./dto/updatePost.dto";
import { CreatePost } from "./dto/createPost.dto";
import { LocationDto } from "./dto/location.dto";
import { FilterDto } from "./dto/filterPost.dto";
import { SearchDto } from "./dto/search.dto";
import { CommentDocument } from "../comments/schema/comments.schema";
export declare class PostsService {
    private schemaModel;
    private commentModel;
    constructor(schemaModel: Model<PostDocument>, commentModel: Model<CommentDocument>);
    create(createDto: CreatePost): Promise<PostDocument>;
    findall(page?: number, limit?: number): Promise<{
        totalCount: number;
        totalPages: number;
        data: any[];
    }>;
    findById(postId: string): Promise<PostDocument>;
    update(id: string, updateDataDto: UpdatePostDto, cid: string): Promise<{
        data: mongoose.Document<unknown, {}, PostDocument> & PostEntity & mongoose.Document<any, any, any> & {
            _id: mongoose.Types.ObjectId;
        };
    }>;
    findMy(id: string): Promise<{
        data: (mongoose.Document<unknown, {}, PostDocument> & PostEntity & mongoose.Document<any, any, any> & {
            _id: mongoose.Types.ObjectId;
        })[];
    }>;
    getWithinRadius(locationDto: LocationDto): Promise<any>;
    filterEvents(filterDto: FilterDto): Promise<any>;
    completed(id: string, cid: string): Promise<{
        data: mongoose.Document<unknown, {}, PostDocument> & PostEntity & mongoose.Document<any, any, any> & {
            _id: mongoose.Types.ObjectId;
        };
    }>;
    searchEvents(searchDto: SearchDto): Promise<any>;
    deletePost(id: string): Promise<mongoose.ModifyResult<mongoose.Document<unknown, {}, PostDocument> & PostEntity & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>>;
    getPostWithAllComments(postId: string): Promise<{
        comments: any[];
        id: any;
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
        _id: any;
        __v?: any;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove";
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: mongoose.Collection<mongoose.mongo.BSON.Document>;
        db: mongoose.Connection;
        errors?: mongoose.Error.ValidationError;
        isNew: boolean;
        schema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
            [x: string]: any;
        }, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
            [x: string]: any;
        }>> & mongoose.FlatRecord<{
            [x: string]: any;
        }> & Required<{
            _id: unknown;
        }>>;
    }>;
    findByUserId(id: string): Promise<any>;
}
