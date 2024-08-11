/// <reference types="multer" />
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
import { PostsService } from "./posts.service";
import { PostEntity } from "./schema/post.schema";
import { User } from "../user/user.schema";
import { UpdatePostDto } from "./dto/updatePost.dto";
import { CreatePost } from "./dto/createPost.dto";
import { LocationDto } from "./dto/location.dto";
import { FilterDto } from "./dto/filterPost.dto";
import { SearchDto } from "./dto/search.dto";
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(user: User, images: Array<Express.Multer.File>, createDto: CreatePost): Promise<import("./schema/post.schema").PostDocument>;
    update(user: User, id: string, images: Array<Express.Multer.File>, updateDatato: UpdatePostDto): Promise<{
        data: import("mongoose").Document<unknown, {}, import("./schema/post.schema").PostDocument> & PostEntity & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    findall(page?: number, limit?: number): Promise<{
        totalCount: number;
        totalPages: number;
        data: any[];
    }>;
    findMy(user: User): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schema/post.schema").PostDocument> & PostEntity & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    findById(id: string): Promise<{
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
        $op: "validate" | "save" | "remove";
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection<import("bson").Document>;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        isNew: boolean;
        schema: import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            [x: string]: any;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            [x: string]: any;
        }>> & import("mongoose").FlatRecord<{
            [x: string]: any;
        }> & Required<{
            _id: unknown;
        }>>;
    }>;
    findUP(id: string): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schema/post.schema").PostDocument> & PostEntity & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    deletePost(id: string): Promise<import("mongoose").ModifyResult<import("mongoose").Document<unknown, {}, import("./schema/post.schema").PostDocument> & PostEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getWithinRadius(locationDto: LocationDto): Promise<any>;
    filteredPosts(filterDto: FilterDto): Promise<any>;
    searchedPosts(searchDto: SearchDto): Promise<any>;
}
