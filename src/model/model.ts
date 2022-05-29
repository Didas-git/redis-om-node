import { Schema, SchemaDefinition } from "../schema";
import { Document } from "../document/document";
import { RedisClient } from "../client/typings";
import { schemaData } from "../privates/symbols";

export class Model<T extends Schema<SchemaDefinition>> {
    private readonly schema: T;

    public constructor(data: T, private readonly client: RedisClient) {
        this.schema = data;
    }

    public create() {
        return new Document(Model.parse(this.schema[schemaData]));
    }

    public save() {
        if (this.schema.options === "JSON") {
            this.client.json.set()
        }
    }

    private static parse<T extends SchemaDefinition>(schema: T): T {
        Object.keys(schema).forEach((key) => {
            let value = schema[key]!;
            if (typeof value === "string")
                value = { type: value, required: false, default: undefined };
            const keys = Object.keys(value);
            if (!("required" in keys))
                value.required = false;
            if (!("default" in keys))
                value.default = undefined;
            if (value.type === "object")
                value.data = Model.parse(value.data);
        })
        return schema;
    }

}
