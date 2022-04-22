import { float } from "./float";
import { integer } from "./integer";
import Point from "./point";

/**
 * Valid types for properties on an {@link Entity}.
 */
type EntityValue = string | number | boolean | Point | Date | Array<unknown> | integer | float | null;

export default EntityValue;
