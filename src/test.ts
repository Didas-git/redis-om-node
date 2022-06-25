import { client } from "./index";
import { inspect } from "util";

(async () => {
    // await client.connect();
    const userSchema = client.schema({
        name: "string",
        age: "number",
        idkWhatToNameThis: {
            type: "tuple",
            elements: ["string", "number"]
        },
        t: {
            type: "object",
            data: {
                a: "string"
            }
        }
    });

    const userModel = client.model("User", userSchema);
    const doc = userModel.create()

    doc.idkWhatToNameThis
    // await client.disconnect();
})()