import { PostEntity } from "../schema/post.schema";
declare const LocationDto_base: import("@nestjs/common").Type<Pick<PostEntity, "location">>;
export declare class LocationDto extends LocationDto_base {
    radius: number;
}
export {};
