import {VariableReferenceSchema} from "./VariableReferenceSchema";
import {LocationRefSchema} from "./LocationSchema";

export interface ConditionBaseSchema {
    id: string;
}

export enum LogicalOperandSchema {
    AND,
    OR,
    NOR,
    NAND
}

export interface ConditionLogical extends ConditionBaseSchema {
    type: "logical";
    operand: LogicalOperandSchema;
    conditions: ConditionRefSchema[];
}

export enum ComparisonOperandSchema {
    "==",
    "!=",
    "<=",
    ">=",
    "<",
    ">"
}

export enum ComparisonTypeSchema {
    Variable,
    Integer,
    String
}

export interface ConditionComparisonSchema extends ConditionBaseSchema {
    type: "comparison";
    operand: ComparisonOperandSchema;
    a: VariableReferenceSchema;
    b: VariableReferenceSchema;
    aType: ComparisonTypeSchema;
    bType: ComparisonTypeSchema;
}

export interface ConditionCheckSchema extends ConditionBaseSchema {
    type: "check";
    variable: VariableReferenceSchema;
}

export interface ConditionLocationSchema extends ConditionBaseSchema {
    type: "location";
    bool: boolean;
    location: LocationRefSchema;
}


export interface ConditionTimePassedSchema extends ConditionBaseSchema {
    type: "timepassed";
    minutes: number;
    variable: VariableReferenceSchema;
}

export interface ConditionTimeRangeSchema extends ConditionBaseSchema {
    type: "timerange";
    first: string;
    last: string;
}

export interface ConditionIsRoleSchema extends ConditionBaseSchema {
    type: "isrole";
    role: string;
}

export type ConditionSchema = ConditionCheckSchema | ConditionComparisonSchema | ConditionIsRoleSchema
                           | ConditionTimePassedSchema | ConditionTimeRangeSchema | ConditionLogical
                           | ConditionLocationSchema;

export type ConditionRefSchema = string;
