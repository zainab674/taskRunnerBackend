/// <reference types="passport" />
declare const PublicStrategy_base: new (...args: any[]) => import("passport").Strategy & import("passport").StrategyCreatedStatic;
export declare class PublicStrategy extends PublicStrategy_base {
    constructor();
    authenticate(): void;
}
export {};
