import type { ApiPropertyOptions } from '@nestjs/swagger';
interface IStringFieldOptions {
    minLength?: number;
    maxLength?: number;
    toLowerCase?: boolean;
    toUpperCase?: boolean;
    swagger?: boolean;
}
interface INumberFieldOptions {
    each?: boolean;
    minimum?: number;
    maximum?: number;
    int?: boolean;
    isPositive?: boolean;
    swagger?: boolean;
}
export declare function NumberField(options?: Omit<ApiPropertyOptions, 'type'> & INumberFieldOptions): PropertyDecorator;
export declare function NumberFieldOptional(options?: Omit<ApiPropertyOptions, 'type' | 'required'> & Partial<{
    each: boolean;
    int: boolean;
    isPositive: boolean;
}>): PropertyDecorator;
export declare function StringField(options?: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions): PropertyDecorator;
export declare function StringFieldOptional(options?: Omit<ApiPropertyOptions, 'type' | 'required'> & IStringFieldOptions): PropertyDecorator;
export declare function EnumField<TEnum>(getEnum: () => TEnum, options?: Omit<ApiPropertyOptions, 'type' | 'enum' | 'enumName'> & Partial<{
    each: boolean;
    swagger: boolean;
}>): PropertyDecorator;
export declare function EnumFieldOptional<TEnum>(getEnum: () => TEnum, options?: Omit<ApiPropertyOptions, 'type' | 'required' | 'enum' | 'enumName'> & Partial<{
    each: boolean;
    swagger: boolean;
}>): PropertyDecorator;
export {};
