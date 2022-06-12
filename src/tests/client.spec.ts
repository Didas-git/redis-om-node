import { createClient } from "redis";
import { describe, test, expect } from "vitest";
import { client, Schema, Model } from "../index";

client.connect();

const userSchema = client.schema({
    name: "string",
    age: "number"
})

const userModel = client.model("User", userSchema);

describe("client", () => {

    // test("connect")

    test("create schema", () => {
        expect(userSchema).toStrictEqual(new Schema({ name: { type: "string", default: undefined, required: false }, age: { type: "number", default: undefined, required: false } }))
    })


    describe("model", () => {
        test.skip("create model", () => {
            expect(userModel).toStrictEqual(new Model(userSchema, createClient()))
        })

        describe("fetch model from client cache", () => {
            test("fetch non existent", () => {
                expect(() => client.model("Non")).toThrowError()
            })

            test("fetch existent", () => {
                expect(client.model("User")).toEqual(new Model(userSchema, createClient()))
            })
        })
    })

    describe("document", () => {
        test.skip("creates a new document with the properties and methods defined", () => {
            expect(client.model("User").create()).toBeDefined()
        })
    })
})