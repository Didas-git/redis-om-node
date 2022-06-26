import { Model } from "../../model";

export type MethodsDefinition = Record<string, (this: Model<any>) => unknown>