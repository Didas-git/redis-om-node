// eslint-disable-next-line @typescript-eslint/naming-convention
export type integer = number & { __int__: void };

class IntegerBuilder {
    private readonly number: number | string;
    public constructor(number: number | string) {
        this.number = number;
    }

    public parse(): integer {
        return <integer><unknown>parseInt(this.number.toString());
    }
}

export function Integer(number: number | string): integer {
    return new IntegerBuilder(number).parse();
}