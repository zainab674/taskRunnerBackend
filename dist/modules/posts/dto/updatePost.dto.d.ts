import { PostEntity } from "../schema/post.schema";
declare const UpdatePostDto_base: import("@nestjs/common").Type<Partial<Pick<PostEntity, "title" | "description" | "images" | "city" | "state" | "zipcode" | "street" | "price" | "isUrgent" | "isFree" | "obo" | "isCompleted" | "location">>>;
export declare class UpdatePostDto extends UpdatePostDto_base {
}
export {};
