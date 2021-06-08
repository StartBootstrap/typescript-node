declare global {
    interface Dictionary<T> {
        [key: string]: T;
    }

    export type UUID = string;
    export type URLString = string;
    export type DateString = string;
    export type HASH = string;
    export type ISOLang = string;

    export const isTest: boolean;
}

export {};
