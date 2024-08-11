import { PostEntity } from "../schema/post.schema";
declare const FilterDto_base: import("@nestjs/common").Type<Partial<Pick<PostEntity, "isUrgent" | "isFree" | "isCompleted" | "location">>>;
export declare class FilterDto extends FilterDto_base {
    radius: number;
}
export {};
