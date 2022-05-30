import { client } from "./index";
import { inspect } from "util";

(async () => {
    // await client.connect();
    const userSchema = client.schema({
        name: "string",
        age: "number",
        address: {
            type: "object",
            data: {
                city: "string",
                postalCode: "string"
            }
        }
    });

    const userModel = client.model("User", userSchema);

    console.log(inspect(userModel.create(), false, null, true));
    // await client.disconnect();
})()