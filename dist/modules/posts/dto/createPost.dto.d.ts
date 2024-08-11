import { PostEntity } from "../schema/post.schema";
declare const CreatePost_base: import("@nestjs/common").Type<Pick<PostEntity, "title" | "description" | "images" | "city" | "state" | "zipcode" | "street" | "price" | "isUrgent" | "isFree" | "obo" | "location">>;
export declare class CreatePost extends CreatePost_base {
    userId: string;
}
export {};
