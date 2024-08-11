import { Strategy } from "passport-jwt";
import { RoleType, TokenType } from "../../constants";
import { UserService } from "../user/user.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate(args: {
        userId: string;
        role: RoleType;
        type: TokenType;
    }): Promise<import("../user/user.schema").User>;
}
export {};
