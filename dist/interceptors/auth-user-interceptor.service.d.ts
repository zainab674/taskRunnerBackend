import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
export declare class AuthUserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): import("rxjs").Observable<any>;
}
