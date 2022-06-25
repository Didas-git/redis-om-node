import { Point } from "./point";
import { ArrayField, FieldTypes, ObjectField, SchemaDefinition, TupleField } from "./schema-definition";

export interface FieldMap<T = unknown> {
    string: string;
    number: number;
    boolean: boolean;
    text: string;
    date: Date;
    point: Point;
    array: Array<T>;
    tuple: [SchemaDefinition]
    object: Record<string, SchemaDefinition>;
}


export type MapSchema<T extends SchemaDefinition> = {
    [K in keyof T]: T[K] extends ObjectField ? MapSchema<Exclude<T[K]["data"], undefined>>
    : T[K] extends ArrayField
    ? FieldMap<FieldMap[Exclude<T[K]["elements"], undefined>]>["array"]
    : T[K] extends TupleField
    // Tuples not implemented, waiting for ts 4.8
    ? never
    : FieldMap[Exclude<T[K], FieldTypes>]
}