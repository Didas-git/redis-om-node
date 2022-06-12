import { ArrayField, ObjectField, SchemaDefinition, SchemaOptions } from "./typings";
import { methods, schemaData } from "../privates/symbols";
import { ErrorLogger } from "@infinite-fansub/logger/dist";
import { inspect } from "node:util";

export class Schema<T extends SchemaDefinition> {

    [methods] = {};
    [schemaData]: T;

    public constructor(data: T, public readonly options?: SchemaOptions) {
        this[schemaData] = Schema.parse(data);
    }

    public add(data: T): void {
        this[schemaData] = { ...this[schemaData], ...data };
    }

    /**
     * for **typescript** users: `this` has to be overwritten so it actually works. I couldn't find a work around as of yet but im open to suggestions.
     */
    public methods<T extends Record<string, () => unknown>>(data: T): T {
        this[methods] = { ...this[methods], ...data };
        return <any>this[methods]
    }

    private static parse<T extends SchemaDefinition>(schema: T): T {
        Object.keys(schema).forEach((key) => {
            let value: SchemaDefinition[string] = schema[key]!;
            if (typeof value === "string") {
                //@ts-expect-error Anti-JS
                if (value === "object" || value === "tuple") throw new ErrorLogger(`Type ${value} needs to use its object definition`, {
                    errCode: "R403",
                    ref: true,
                    lineErr: {
                        err: inspect({ [key]: schema[key] }, false, null, true),
                        marker: "Parsing:"
                    }
                })

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
                    else (<ObjectField><unknown>value).data = Schema.parse((<ObjectField><unknown>value).data!);
            }
            //@ts-expect-error More Shenanigans
            schema[key] = value
        })
        return schema;
    }
}