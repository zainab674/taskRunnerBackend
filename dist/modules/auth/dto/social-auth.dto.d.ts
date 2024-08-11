import { User } from "../../user/user.schema";
declare const SoicalAuthDto_base: import("@nestjs/common").Type<Pick<User, keyof User>>;
export declare class SoicalAuthDto extends SoicalAuthDto_base {
    latitude: string;
    longitude: string;
}
export {};
