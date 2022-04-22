import Client, { SearchDataStructure, RedisHashData, RedisJsonData } from "./client";

import { integer, Integer } from "./entity/integer";
import { float, Float } from "./entity/float";
import { Tuple } from "./tuple-helper-type";

import Point from "./entity/point";
import Entity from "./entity/entity";
import EntityData from "./entity/entity-data";
import EntityValue from "./entity/entity-value";
import EntityConstructor from "./entity/entity-constructor";

import Schema from "./schema/schema";
import SchemaDefinition from "./schema/definition/schema-definition";
import FieldDefinition from "./schema/definition/field-definition";
import BaseFieldDefinition from "./schema/definition/base-field-definition";
import SortableFieldDefinition from "./schema/definition/sortable-field-definition";
import SeparableFieldDefinition from "./schema/definition/separable-field-definition";
import StringFieldDefinition from "./schema/definition/string-field-definition";
import BooleanFieldDefinition from "./schema/definition/boolean-field-definition";
import NumberFieldDefinition from "./schema/definition/number-field-definition";
import TextFieldDefinition from "./schema/definition/text-field-definition";
import DateFieldDefinition from "./schema/definition/date-field-definition";
import PointFieldDefinition from "./schema/definition/point-field-definition";
import StringArrayFieldDefinition from "./schema/definition/string-array-field-definition";
import IntegerFieldDefinition from "./schema/definition/integer-field-definition";
import FloatFieldDefinition from "./schema/definition/float-field-definition";

import SchemaOptions from "./schema/options/schema-options";
import DataStructure from "./schema/options/data-structure";
import IdStrategy from "./schema/options/id-strategy";
import StopWordOptions from "./schema/options/stop-word-options";

import Repository from "./repository/repository";

import RedisError from "./errors";
import { AbstractSearch, Search, RawSearch, SubSearchFunction } from "./search/search";
import Where from "./search/where";
import WhereField from "./search/where-field";
import { Circle, CircleFunction } from "./search/where-point";


export {
  Client,
  SearchDataStructure,
  RedisHashData,
  RedisJsonData,
  Entity,
  EntityData,
  EntityValue,
  EntityConstructor,
  RedisError,
  Repository,
  Schema,
  SchemaDefinition,
  Point,
  FieldDefinition,
  SchemaOptions,
  DataStructure,
  IdStrategy,
  StopWordOptions,
  BaseFieldDefinition as Field,
  SortableFieldDefinition as Sortable,
  SeparableFieldDefinition as Separable,
  BooleanFieldDefinition as BooleanField,
  DateFieldDefinition as DateField,
  NumberFieldDefinition as NumberField,
  PointFieldDefinition as PointField,
  StringFieldDefinition as StringField,
  StringArrayFieldDefinition as StringArrayField,
  TextFieldDefinition as TextField,
  IntegerFieldDefinition as IntegerField,
  FloatFieldDefinition as FloatField,
  AbstractSearch,
  Search,
  RawSearch,
  SubSearchFunction,
  Where,
  WhereField,
  Circle,
  CircleFunction,
  integer,
  Integer,
  float,
  Float,
  Tuple
};
