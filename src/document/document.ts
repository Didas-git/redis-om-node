import { SchemaDefinition } from "../schema";

export class Document<T extends SchemaDefinition> {
    public constructor(public data: T) { }


}