import { SchemaDefinition } from "./typings";
import { defaults, methods, schemaData } from "../privates/symbols";

export class Schema<K extends SchemaDefinition> {

    [methods] = {};
    /**
     * string is the key of the schema defenition
     */
    [defaults]: Record<string, any> = {};
    [schemaData]: K;

    public constructor(data: K) {
        this[schemaData] = data;
    }

    public add(data: K): void {
        this[schemaData] = { ...this[schemaData], ...data };
    }

    /**
     * for **typescript** users: `this` has to be overriten so it actually works. I couldn't find a work arround as of yet but im open to suggestions.
     */
    public methods<T extends unknown>(): Record<keyof T, T[keyof T]> {
        return <any>this[methods]
    }
}