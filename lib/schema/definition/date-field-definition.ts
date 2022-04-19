import BaseFieldDefinition from "./base-field-definition";
import SortableFieldDefinition from "./sortable-field-definition";

/** A field representing a date/time. */
interface DateFieldDefinition extends BaseFieldDefinition, SortableFieldDefinition {
  /** Yep. It's a date. */
  type: 'date';
  default?: Date;
}

export default DateFieldDefinition;
