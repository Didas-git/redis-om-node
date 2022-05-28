//@ts-nocheck
/*
SchemaDefinition = Record<string, {type: string | number | boolean | text | date | point | array}>
*/

import { FieldMap, SchemaDefinition } from "src/schema";
/*
schemaData: {
    name: {
        type: "object",
        default: "D",
        required: true,
        data: {
            ifk: {type: "string"}
        }
    },
    
    tongue: "string"

    age: {
        type: "array",
        elements: "string"
    }

    age2: {
        type: "tuple",
        elements: ["array", {ob: {type: "number"}}],
    }
}

type: {
    name: {
        ifk: "string"
    },
    age: [undefined, "string"]
    age2: ["array", {ob: "number"}]
}

default: {
    name: "D"
}

required: {

}
*/

export function parseType<T extends SchemaDefinition>(schema: T) {
    let typeObject = <any>{};
    for (const key in schema) {
        const value = schema[key]!;
        let type: keyof FieldMap;
        if (typeof value === "object") {
            type = value.type;

            if (type === "object")
                typeObject[key] = parseType(value.data);
            else if (type === "array")
                typeObject[key] = [undefined, value.elements];
            else if (type === "tuple") {
                typeObject[key] = value.elements.map((el: keyof FieldMap | SchemaDefinition) => {
                    if (typeof el === "string")
                        return el;
                    else
                        return parseType(el);
                });
            } else typeObject[key] = type;
        } else {
            type = value;

            if (type === "object" || type === "tuple")
                throw new Error("You fucking moron. Those types have unique properties which are entirely required. You imbecile. Unacceptable.");

            typeObject[key] = type;
        }
    };
    return typeObject;
}

console.log(JSON.stringify(parseType({
    name: {
        type: "object",
        default: "D",
        required: true,
        data: {
            ifk: { type: "string" }
        }
    },

    tongue: "string",

    age: {
        type: "array",
        elements: "string"
    },

    age2: {
        type: "tuple",
        elements: [{ type: "array", elements: "number" }, { ob: { type: "tuple", elements: [{ id: { type: "object", data: { t: "number" } } }] } }],
    }
})))