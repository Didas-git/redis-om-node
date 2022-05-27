import { createClient } from "redis";
import { URLObject, RedisJSON } from "./typings";
import { MapSchema, Schema, SchemaDefinition } from "../schema";
import { Model } from "../model/model";
import { types } from "../privates/symbols";

export class Client {
    #client?: ReturnType<typeof createClient>;
    #isOpen: boolean = false;
    #models: Map<string, Model<any>> = new Map();

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

    public async jsonSet(key: string, path: string, json: RedisJSON, options?: { NX: true } | { XX: true }): Promise<"OK" | undefined | null> {
        return await this.#client?.json.set(key, path, json, options);
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

    public schema<T extends SchemaDefinition>(schemaData: T) {
        return new Schema<T>(schemaData);
    }

    public model<T extends Schema<SchemaDefinition>>(name: string, schema?: T) {
        if (this.#models.has(name)) return <Model<T> & MapSchema<T>>this.#models.get(name)!;

        if (!schema) throw new Error("You have to pass a schema if it doesnt exist");

        const model = new Model(schema)[types]();
        this.#models.set(name, model);
        return model;
    }
}

// (async () => {
//     const client = await new Client().connect();
//     await client.jsonSet("t", "$", { d: "t" });
//     await client.disconnect();
//     const userSchema = client.schema({ name: { type: "string" }, age: { type: "number" } });
//     const userModel = client.model("User", userSchema);
// })()