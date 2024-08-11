import type { LanguageCode } from '../constants';
import type { User } from '../modules/user/user.schema';
export declare class ContextProvider {
    private static readonly nameSpace;
    private static readonly authUserKey;
    private static readonly languageKey;
    private static get;
    private static set;
    private static getKeyWithNamespace;
    static setAuthUser(user: User): void;
    static setLanguage(language: string): void;
    static getLanguage(): LanguageCode | undefined;
    static getAuthUser(): User | undefined;
}
