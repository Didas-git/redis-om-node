import EntityField from "./entity-field";
import EntityValue from "../entity-value";
import { Integer } from "../integer";

class EntityIntegerField extends EntityField {
    fromRedisHash(value: string) {
        const int = Integer(value)
        if (Number.isNaN(int)) throw Error(`Non-numeric value of '${value}' read from Redis for number field.`);
        this.value = int;
    }

    protected valdiateValue(value: EntityValue) {
        super.valdiateValue(value);
        if (value !== null && !this.isNumber(value))
            throw Error(`Expected value with type of 'number' but received '${value}'.`);
    }
}

export default EntityIntegerField;
