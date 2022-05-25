import { Point } from "./point";

export interface FieldMap {
    string: string;
    number: number;
    boolean: boolean;
    text: string;
    date: Date;
    point: Point;
    array: Array<string | number | boolean>
}

export type MapSchema<T extends Record<string, Record<string, keyof FieldMap>>> = {
    [K in keyof T]: FieldMap[T[K]["type"]]
}