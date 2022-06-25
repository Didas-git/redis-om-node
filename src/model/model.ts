import { MapSchema, Schema, SchemaDefinition } from "../schema";
import { Document } from "../document";
import { RedisClient } from "../client";
import { schemaData } from "../privates/symbols";
import { ExtractSchemaGeneric } from "./typings";

export class Model<T extends Schema<SchemaDefinition>> {
    private readonly schema: T;
    public constructor(data: T, private readonly client: RedisClient) {
        this.schema = data;
    }

    public create(): Document<ExtractSchemaGeneric<T>> & MapSchema<ExtractSchemaGeneric<T>> {
        const doc = new Document();
        Object.keys(this.schema[schemaData]).forEach((key) => {
            Object.defineProperty(doc, key, {
                configurable: true,
                get: function (): unknown {
                    return this[key]
                },

                set: function (value: unknown) {
                    this[key] = value
                }
            })
        })

        return <any>doc
    }

    public save(doc: Document<SchemaDefinition>) {
        if (!this.schema.options || this.schema.options === "JSON")
            //@ts-ignore JS Shenanigans
            this.client.json.set(this.schema.costructor.name, "$", JSON.parse(doc.toString()))
        else if (this.schema.options === "HASH")
            this.client.hSet(this.schema.constructor.name, "$", doc.toString());
    }
}