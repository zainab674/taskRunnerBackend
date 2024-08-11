import { Action } from '../casl/userRoles';
export declare function Auth(roles: Action, options: string): MethodDecorator;
export declare const IS_PUBLIC_KEY = "isPublic";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
