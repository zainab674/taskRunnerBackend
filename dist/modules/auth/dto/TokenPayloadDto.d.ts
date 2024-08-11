import { User } from '../../user/user.schema';
export declare class TokenPayloadDto {
    expiresIn: number;
    accessToken: string;
    user: User;
    constructor(data: {
        accessToken: string;
        user: User;
    });
}
