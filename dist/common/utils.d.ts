import type { Optional } from '../types';
export declare function generateHash(password: string): string;
export declare function getCharacterString(): string;
export declare function validateHash(password: Optional<string>, hash: Optional<string>): Promise<boolean>;
export declare function stringEncode(valueToEncode: any, numberOfTimes: any): Promise<string>;
export declare function stringDecode(valueToDecode: any, numberOfTimes: any): string;
export declare function getVariableName<TResult>(getVar: () => TResult): string;
