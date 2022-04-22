import BooleanFieldDefinition from "./boolean-field-definition";
import DateFieldDefinition from "./date-field-definition";
import NumberFieldDefinition from "./number-field-definition";
import PointFieldDefinition from "./point-field-definition";
import StringArrayFieldDefinition from "./string-array-field-definition";
import StringFieldDefinition from "./string-field-definition";
import TextFieldDefinition from "./text-field-definition";
import IntegerFieldDefinition from "./integer-field-definition";
import FloatFieldDefinition from "./float-field-definition";

/** Contains instructions telling how to map a property on an {@link Entity} to Redis. */
type FieldDefinition = StringFieldDefinition | TextFieldDefinition | NumberFieldDefinition | BooleanFieldDefinition | PointFieldDefinition | DateFieldDefinition | StringArrayFieldDefinition | IntegerFieldDefinition | FloatFieldDefinition;

export default FieldDefinition;
