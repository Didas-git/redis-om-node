import { Schema } from '../../../lib/schema/schema';
import { Entity } from '../../../lib/entity/entity';
import { SchemaDefinition } from '../../../lib/schema/definition';
import { DataStructure } from '../../../lib/schema/options';

describe("Schema", () => {
  describe.each([

    ["that defines an unconfigured date for a JSON", {
      schemaDef: { aField: { type: 'date' } } as SchemaDefinition,
      dataStructure: 'JSON',
      expectedRedisSchema: ['$.aField', 'AS', 'aField', 'NUMERIC']
    }],

    ["that defines an aliased date for a JSON", {
      schemaDef: { aField: { type: 'date', alias: 'anotherField' } } as SchemaDefinition,
      dataStructure: 'JSON',
      expectedRedisSchema: ['$.anotherField', 'AS', 'anotherField', 'NUMERIC']
    }],

    ["that defines a sorted date for a JSON", {
      schemaDef: { aField: { type: 'date', sortable: true } } as SchemaDefinition,
      dataStructure: 'JSON',
      expectedRedisSchema: ['$.aField', 'AS', 'aField', 'NUMERIC', 'SORTABLE']
    }],

    ["that defines an unsorted date for a JSON", {
      schemaDef: { aField: { type: 'date', sortable: false } } as SchemaDefinition,
      dataStructure: 'JSON',
      expectedRedisSchema: ['$.aField', 'AS', 'aField', 'NUMERIC']
    }],

    ["that defines an indexed date for a JSON", {
      schemaDef: { aField: { type: 'date', indexed: true } } as SchemaDefinition,
      dataStructure: 'JSON',
      expectedRedisSchema: ['$.aField', 'AS', 'aField', 'NUMERIC']
    }],

    ["that defines an indexed date for a JSON", {
      schemaDef: { aField: { type: 'date', indexed: false } } as SchemaDefinition,
      dataStructure: 'JSON',
      expectedRedisSchema: ['$.aField', 'AS', 'aField', 'NUMERIC', 'NOINDEX']
    }],

    ["that defines a fully configured date for a JSON", {
      schemaDef: { aField: { type: 'date', alias: 'anotherField', sortable: true, indexed: false } } as SchemaDefinition,
      dataStructure: 'JSON',
      expectedRedisSchema: ['$.anotherField', 'AS', 'anotherField', 'NUMERIC', 'SORTABLE', 'NOINDEX']
    }]

  ])("%s", (_, data) => {

    class TestEntity extends Entity {}

    it("generates a Redis schema for the field", () => {
      let schemaDef = data.schemaDef;
      let dataStructure = data.dataStructure as DataStructure;
      let expectedRedisSchema = data.expectedRedisSchema;

      let schema = new Schema<TestEntity>(TestEntity, schemaDef, { dataStructure });
      expect(schema.redisSchema).toEqual(expectedRedisSchema);
    });
  });
});
