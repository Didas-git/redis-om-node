import BaseFieldDefinition from "./base-field-definition";
import SortableFieldDefinition from "./sortable-field-definition";

/** A field representing a floating point number. */
interface FloatFieldDefinition extends BaseFieldDefinition, SortableFieldDefinition {
    /** Yep. It's a float. */
    type: 'float';
}

export default FloatFieldDefinition;
