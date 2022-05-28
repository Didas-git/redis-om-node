import { Point } from "./point";
import { SchemaDefinition } from "./schema-definition";

export interface FieldMap {
    string: string;
    number: number;
    boolean: boolean;
    text: string;
    date: Date;
    point: Point;
    array: Array<string | number | boolean>;
    tuple: [any]
    object: Record<string, SchemaDefinition>;
}

// export type MapSchema<T extends Schema<SchemaDefinition>> = {
//     [K in keyof T[typeof schemaData]]: FieldMap[T[typeof schemaData][K]["type"]]
// }