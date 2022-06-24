import { Point } from "./point";
import { FieldTypes, SchemaDefinition } from "./schema-definition";

export interface FieldMap {
    string: string;
    number: number;
    boolean: boolean;
    text: string;
    date: Date;
    point: Point;
    array: Array<string | number | boolean>;
    tuple: [SchemaDefinition]
    object: Record<string, SchemaDefinition>;
}

export type MapSchema<T extends SchemaDefinition> = {
    [K in keyof T]: T[K] extends FieldTypes ? FieldMap[T[K]["type"]] : FieldMap[T[K]]
}