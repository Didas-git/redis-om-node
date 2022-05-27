import { FieldMap } from "./field-map";

export type SchemaDefinition = Record<string, FieldTypes>;

export type FieldTypes = Record<"type", keyof FieldMap>