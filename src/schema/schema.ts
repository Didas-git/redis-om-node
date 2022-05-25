import { SchemaDefinition } from "./typings/schema-definition";

export default class Schema<T = unknown> {

    /**
     * Model is included on this type so typescript can get the model functions inside the custom functions (subject to change).
     * Also `this` has to be overriten so it actually works. I couldn't find a work arround as of yet but im open to suggestions.
     */
    public methods: Record<keyof T, T[keyof T]> = <never>{};
    /**
     * string is the key of the schema defenition
     */
    public defaults: Record<string, any> = {};

    public constructor(private schemaData: SchemaDefinition) { }

    public add(schemaData: SchemaDefinition): void {
        this.schemaData = { ...this.schemaData, ...schemaData };
    }
}