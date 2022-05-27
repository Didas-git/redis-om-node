import { Schema, SchemaDefinition } from "../schema";
import { methods } from "../privates/symbols";
// import { Client } from "../client/client";

export class Model<T extends Schema<SchemaDefinition>> {
    private readonly schema: T;

    public constructor(data: T, /* private readonly client: Client */) {
        this.schema = data;
        this.parseMethods();
        // this.parseSchema();
    }

    private parseMethods(): void {
        Object.keys(this.schema[methods]).forEach((key) => {
            //@ts-expect-error Can't be bothered to use Object.defineProperty
            this[key] = this.schema[methods][key];
        });
    }

    // private parseSchema(): void {
    //     Object.keys(this.schema[schemaData]).forEach((key) => {
    //         //@ts-expect-error Can't be bothered to use Object.defineProperty
    //         this[key] = key;
    //     })
    // }
}