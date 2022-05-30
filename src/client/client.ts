import { createClient } from "redis";
import { Model } from "../model/model";
import { Schema, SchemaDefinition } from "../schema";
import { URLObject, RedisClient } from "./typings";

export class Client {
    #client?: RedisClient;
    #isOpen: boolean = false;
    #models: Map<string, Model<any>> = new Map();
    static t = "";

    public async connect(url: string | URLObject = "redis://localhost:6379"): Promise<Client> {
        if (this.#isOpen) return this;

        if (typeof url === "object") {

            const { username, password, entrypoint, port } = url;
            url = `${username}:${password}@${(/:\d$/).exec(entrypoint) ? entrypoint : `${entrypoint}:${port}`}`;
        }

        this.#client = createClient({ url });
        this.#client.connect();
        this.#isOpen = true;

        return this;
    }

    public async disconnect(): Promise<Client> {
        await this.#client?.quit();

        this.#isOpen = false
        return this;
    }

    public async forceDisconnect(): Promise<Client> {
        await this.#client?.disconnect();

        this.#isOpen = false
        return this;
    }

    public schema<T extends SchemaDefinition>(schemaData: T): Schema<T> {
        return new Schema<T>(schemaData);
    }

    public model<T extends Schema<SchemaDefinition>>(name: string, schema?: T): Model<T> {
        if (this.#models.has(name)) return <any>this.#models.get(name)!;

        if (!schema) throw new Error("You have to pass a schema if it doesnt exist");

        const model = new Model(schema, this.#client!);
        this.#models.set(name, model);
        return <any>model;
    }
}

// (async () => {
//     const client = await new Client().connect();
//     await client.disconnect();
//     const userSchema = client.schema({ name: { type: "string" }, age: { type: "number" } });
//     const userModel = client.model("User", userSchema);
//     userSchema.methods({
//         async findByName(this: any) {
//             return this.query()
//         }
//     })
// })()