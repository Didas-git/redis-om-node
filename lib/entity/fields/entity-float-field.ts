import EntityField from "./entity-field";
import EntityValue from "../entity-value";
import { Float } from "../float";

class EntityFloatField extends EntityField {
    fromRedisHash(value: string) {
        const float = Float(value)
        if (Number.isNaN(float)) throw Error(`Non-numeric value of '${value}' read from Redis for number field.`);
        this.value = float;
    }

    protected valdiateValue(value: EntityValue) {
        super.valdiateValue(value);
        if (value !== null && !this.isNumber(value))
            throw Error(`Expected value with type of 'number' but received '${value}'.`);
    }
}

export default EntityFloatField;
