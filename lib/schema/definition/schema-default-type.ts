import Point from "../../entity/point";

/**
 * Valid defaults at {@link FieldDefinition}.
 */
type SchemaDefaultType = string | number | boolean | Date | Point | Array<any>;

export default SchemaDefaultType;
