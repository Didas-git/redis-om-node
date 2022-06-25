import { client } from "./index";

(async () => {
    // await client.connect();
    const userSchema = client.schema({
        name: "string",
        age: "number",
        friends: {
            type: "array",
            elements: {
                id: "number"
            }
        }
    });

    const userModel = client.model("User", userSchema);
    const doc = userModel.create()

    doc.friends[0].id
    // await client.disconnect();
})()