import { User } from '../../user/user.schema';
declare const VerifyOtpDto_base: import("@nestjs/common").Type<Pick<User, "otp">>;
export declare class VerifyOtpDto extends VerifyOtpDto_base {
    otp: string;
}
export {};
