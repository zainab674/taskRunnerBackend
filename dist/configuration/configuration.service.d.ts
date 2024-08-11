import type { MongooseModuleOptions } from "@nestjs/mongoose";
export declare class ConfigurationService {
    get mongooseConfig(): MongooseModuleOptions;
    get authConfig(): {
        privateKey: string;
        publicKey: string;
    };
    get documentationEnabled(): string;
    get userReputationConfig(): {
        upVote: string;
        downVote: string;
        updateUpVote: string;
        updateDownVote: string;
    };
    get appConfig(): {
        port: string | number;
    };
    get isDevelopment(): boolean;
    get isProduction(): boolean;
    get isTest(): boolean;
    get nodeEnv(): string;
}
