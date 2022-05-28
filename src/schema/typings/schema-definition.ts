import { FieldMap } from "./field-map";
import { Point } from "./point";

export type SchemaDefinition = Record<string, keyof Omit<FieldMap, "object" | "tuple"> | FieldTypes>;

export type FieldTypes = StringField | NumberField | BooleanField | TextField | DateField | PointField | ArrayField | TupleField | ObjectField;

interface BaseField {
    type: keyof FieldMap;
    required?: boolean;
}

interface StringField extends BaseField {
    type: "string";
    default?: string;
}

interface NumberField extends BaseField {
    type: "number";
    default?: number;
}

interface BooleanField extends BaseField {
    type: "boolean";
    default?: boolean;
}

interface TextField extends BaseField {
    type: "text";
    default?: string;
}

interface DateField extends BaseField {
    type: "date";
    default?: Date;
}

interface PointField extends BaseField {
    type: "point";
    default?: Point;
}

interface ArrayField extends BaseField {
    type: "array";
    elements?: any;
}

interface TupleField extends BaseField {
    type: "tuple";
    elements: any;
}

interface ObjectField extends BaseField {
    type: "object";
    data?: {};
}