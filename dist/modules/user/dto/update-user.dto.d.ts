import { User } from "../user.schema";
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<Omit<User, "role" | "otp" | "isOtpUsed" | "verify" | "status">>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
