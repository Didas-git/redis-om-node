import { Schema } from "../../schema";

export type ExtractSchemaGeneric<T> = T extends Schema<infer X> ? X : never