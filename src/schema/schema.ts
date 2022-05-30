import { SchemaDefinition, SchemaOptions } from "./typings";
import { methods, schemaData } from "../privates/symbols";

export class Schema<K extends SchemaDefinition> {

    [methods] = {};
    [schemaData]: K;

    public constructor(data: K, public readonly options?: SchemaOptions) {
        this[schemaData] = data;
    }

    public add(data: K): void {
        this[schemaData] = { ...this[schemaData], ...data };
    }

    /**
     * for **typescript** users: `this` has to be overwritten so it actually works. I couldn't find a work around as of yet but im open to suggestions.
     */
    public methods<T extends Record<string, () => unknown>>(data: T): T {
        this[methods] = { ...this[methods], ...data };
        return <any>this[methods]
    }
}