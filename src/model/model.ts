import { ArrayField, ObjectField, Schema, SchemaDefinition } from "../schema";
import { Document } from "../document";
import { RedisClient } from "../client";
import { schemaData } from "../privates/symbols";

export class Model<T extends Schema<SchemaDefinition>> {
    private readonly schema: T;
    private parsed: SchemaDefinition;
    public constructor(data: T, private readonly client: RedisClient) {
        this.schema = data;
        this.parsed = Model.parse(this.schema[schemaData])
    }

    public create() {
        const doc = new Document();
        Object.keys(this.parsed).forEach((key) => {
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

        return doc
    }

    public save(doc: Document) {
        if (!this.schema.options || this.schema.options === "JSON")
            //@ts-ignore JS Shenanigans
            this.client.json.set(this.schema.costructor.name, "$", JSON.parse(doc.toString()))
        else if (this.schema.options === "HASH")
            this.client.hSet(this.schema.constructor.name, "$", doc.toString());
    }

    private static parse<T extends SchemaDefinition>(schema: T): T {
        Object.keys(schema).forEach((key) => {
            let value: SchemaDefinition[string] = schema[key]!;
            if (typeof value === "string") {
                //@ts-expect-error Anti-JS
                if (value === "object" || value === "tuple") throw new Error(`Type ${value} needs to use its object definition`)
                // {
                // errCode: "R403",
                // ref: true,
                // lineErr: {
                //     err: inspect({[key]: schema[key]}, false, null, true),
                //     marker: "Parsing:"
                // }
                if (value === "array")
                    value = <ArrayField><unknown>{ type: value, required: false, elements: undefined }
                else
                    //@ts-expect-error TS can't figure this out
                    value = { type: value, required: false, default: undefined }
            } else {
                if (!value.type) throw new Error("Type not defined");
                if (value.type !== "array" && value.type !== "object" && value.type !== "tuple") {
                    if (!value.required) value.required = false;
                    if (!value.default) value.default = undefined;
                }
                if (value.type === "array")
                    if (!value.elements) (<ArrayField><unknown>value).elements = undefined;
                if (value.type === "tuple")
                    if (!value.elements) throw new Error("A Tuple type needs to have its elements defined");
                if (value.type === "object")
                    if (!value.data) (<ObjectField><unknown>value).data = undefined
                    else (<ObjectField><unknown>value).data = Model.parse((<ObjectField><unknown>value).data!);
            }
            //@ts-expect-error More Shenanigans
            schema[key] = value
        })
        return schema;
    }
}