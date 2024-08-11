import type { Optional } from '../types';
export declare class GeneratorProvider {
    static uuid(): string;
    static fileName(ext: string): string;
    static getS3PublicUrl(key: string): Optional<string>;
    static getS3Key(publicUrl: string): Optional<string>;
    static generateVerificationCode(): string;
    static generatePassword(): string;
    static generateRandomString(length: number): string;
}
