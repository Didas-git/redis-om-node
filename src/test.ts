import { client } from "./index";
import { inspect } from "util";

(async () => {
    // await client.connect();
    const userSchema = client.schema({
        name: "string",
        age: "number"
    });

    const userModel = client.model("User", userSchema);

    console.log(inspect(userModel.create(), false, null, true));

    const doc = userModel.create()

    doc.age
    // await client.disconnect();
})()