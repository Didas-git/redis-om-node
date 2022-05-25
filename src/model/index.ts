import Schema from "src/schema/schema";

export default class Model {
    private readonly schema: Schema;

    public constructor(data: Schema) {
        this.schema = data;
        this.parseMethods();
    }

    private parseMethods(): void {
        Object.keys(this.schema.methods).forEach((key) => {
            //@ts-expect-error Can't be bothered to use Object.defineProperty
            this[key] = this.schema.methods[key];
        });
    }

    public x(): string {
        return "dv";
    }
}