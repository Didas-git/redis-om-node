import { Point } from "./point";
import { ArrayField, FieldTypes, ObjectField, SchemaDefinition, TupleField } from "./schema-definition";

export interface FieldMap<T = string> {
    string: string;
    number: number;
    boolean: boolean;
    text: string;
    date: Date;
    point: Point;
    array: Array<T>;
    tuple: { -readonly [K in keyof T]: T[K] }
    object: Record<string, SchemaDefinition>;
}


export type MapSchema<T extends SchemaDefinition> = {
    -readonly [K in keyof T]: T[K] extends ObjectField
    ? MapSchema<Exclude<T[K]["data"], undefined>>
    : T[K] extends ArrayField
    ? FieldMap<FieldMap[Exclude<T[K]["elements"], undefined>]>["array"]
    : T[K] extends TupleField
    ? FieldMap<DeconstructTuple<T[K]["elements"]>>["tuple"]
    : FieldMap[Exclude<T[K], FieldTypes>]
}

export type DeconstructTuple<T extends TupleField["elements"]> = {
    [K in keyof T]: T[K] extends FieldTypes
    ? T[K] extends ObjectField
    ? MapSchema<Exclude<T[K]["data"], undefined>>
    : T[K] extends ArrayField
    ? FieldMap<FieldMap[Exclude<T[K]["elements"], undefined>]>["array"]
    : T[K] extends TupleField
    ? FieldMap<DeconstructTuple<T[K]["elements"]>>["tuple"]
    : FieldMap[T[K]["type"]]
    //@ts-expect-error
    : FieldMap[T[K]]
}