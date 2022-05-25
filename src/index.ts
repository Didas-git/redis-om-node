type SchemaDefinition = Record<string, FieldDefinition>;

type FieldDefinition = {
    type: keyof SchemaMap
}

interface SchemaMap {
    string: string;
    number: number;
    boolean: boolean;
    text: string;
    date: Date;
    // point: Point;
    array: Array<string | number | boolean>
}

const t: SchemaDefinition = {
    ar: { type: "string" }
}

type mappi<T extends SchemaDefinition> = {
    [K in keyof T]: SchemaDefinition[T[K]["type"]]["type"]
}

type map<T extends keyof SchemaMap> = {
    [K in keyof T]: SchemaMap[T]
}

function returnType<T extends SchemaDefinition>(t: T): mappi<T> {
    return t
}

const f = returnType(t).toString()
type s = typeof f
