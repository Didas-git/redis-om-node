import { FieldMap } from "./field-map";

export type SchemaDefinition = Record<string, FieldTypes>;

export interface FieldTypes {
    type: keyof FieldMap;
}

export type TES<T extends Record<string, FieldTypes> = Record<string, FieldTypes>> = {
    [K in keyof T]: FieldTypes["type"] extends "string" ? true : false
};