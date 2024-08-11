import { User } from "../../user/user.schema";
declare const UserSignupDto_base: import("@nestjs/common").Type<Pick<User, "fullName" | "email" | "password" | "city">>;
export declare class UserSignupDto extends UserSignupDto_base {
}
export {};
