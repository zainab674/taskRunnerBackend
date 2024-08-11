import { CanActivate, ExecutionContext } from "@nestjs/common";
import { UserService } from "./../modules/user/user.service";
export declare class IsUserUnique implements CanActivate {
    private userService;
    constructor(userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
