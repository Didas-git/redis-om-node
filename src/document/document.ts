import { Schema, SchemaDefinition } from "../schema";

export class Document<T extends SchemaDefinition> {
    public constructor(data: T) { }


}