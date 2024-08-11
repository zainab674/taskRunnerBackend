import { PostEntity } from "../schema/post.schema";
declare const SearchDto_base: import("@nestjs/common").Type<Pick<PostEntity, "title">>;
export declare class SearchDto extends SearchDto_base {
}
export {};
