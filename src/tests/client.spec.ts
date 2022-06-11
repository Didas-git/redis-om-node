import { createClient } from "redis";
import { describe, test, expect } from "vitest";
import { client, Schema, Model } from "../index";

const userSchema = client.schema({
    name: "string",
    age: "number"
})

const userModel = client.model("User", userSchema);

describe("client", () => {

    test("create schema", () => {
        expect(userSchema).toStrictEqual(new Schema({ name: "string", age: "number" }))
    })


    test.skip("model", () => {
        expect(userModel).toStrictEqual(new Model(userSchema, createClient()))
    })

    describe("document", () => {
        test.skip("creates a new document with the properties and methods defined", () => {
            expect(client.model("User").create()).toBeDefined()
        })

        test("fetch model from client cache", () => {
            expect(() => client.model("User")).toThrowError()
        })
    })
})