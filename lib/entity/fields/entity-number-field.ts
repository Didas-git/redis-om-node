import EntityField from "./entity-field";
import EntityValue from "../entity-value";

class EntityNumberField extends EntityField {
  fromRedisHash(value: string) {
    if (Number.isNaN(value)) throw Error(`Non-numeric value of '${value}' read from Redis for number field.`);
    this.value = value;
  }

  protected valdiateValue(value: EntityValue) {
    super.valdiateValue(value);
    if (value !== null && !this.isNumber(value))
      throw Error(`Expected value with type of 'number' but received '${value}'.`);
  }
}

export default EntityNumberField;
