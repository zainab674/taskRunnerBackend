import type { Type } from '@nestjs/common';
export declare function ApiPageOkResponse<T extends Type>(options: {
    type: T;
    description?: string;
}): MethodDecorator;
