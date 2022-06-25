import { client } from "./index";

(async () => {
    // await client.connect();
    const userSchema = client.schema({
        name: "string",
        age: "number",
        idkWhatToNameThis: {
            type: "tuple",
            elements: ["string", "number", "array", { type: "object", data: { a: "string" } }] as const
        },
        myObj: {
            type: "object",
            data: {
                a: "string"
            }
        },
        randArr: {
            type: "array",
            elements: "number"
        }
    });

    const userModel = client.model("User", userSchema);
    const doc = userModel.create()

    doc.idkWhatToNameThis
    // await client.disconnect();
})()