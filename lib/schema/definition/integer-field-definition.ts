import BaseFieldDefinition from "./base-field-definition";
import SortableFieldDefinition from "./sortable-field-definition";

/** A field representing a integer. */
interface IntegerFieldDefinition extends BaseFieldDefinition, SortableFieldDefinition {
    /** Yep. It's a integer. */
    type: 'integer';
}

export default IntegerFieldDefinition;
