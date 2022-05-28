import { Schema, SchemaDefinition } from "../schema";

export class Document<T extends Schema<SchemaDefinition>> {
    constructor(data: T) { }
}