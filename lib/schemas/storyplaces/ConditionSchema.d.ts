import { VariableReferenceSchema } from "./VariableReferenceSchema";
import { LocationRefSchema } from "./LocationSchema";
export interface ConditionBaseSchema {
    id: string;
}
export declare enum LogicalOperand {
    AND = "AND",
    OR = "OR"
}
export interface ConditionLogicalSchema extends ConditionBaseSchema {
    type: "logical";
    operand: LogicalOperand;
    conditions: ConditionRefSchema[];
}
export declare enum ComparisonOperand {
    EQUAL = "==",
    NOT_EQUAL = "!=",
    LESS_OR_EQUAL = "<=",
    GREATER_OR_EQUAL = ">=",
    LESS = "<",
    GREATER = ">"
}
export declare enum ComparisonType {
    Variable = "Variable",
    Integer = "Integer",
    String = "String"
}
export interface ConditionComparisonSchema extends ConditionBaseSchema {
    type: "comparison";
    operand: ComparisonOperand;
    a: string | VariableReferenceSchema;
    b: string | VariableReferenceSchema;
    aType: ComparisonType;
    bType: ComparisonType;
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
export declare type ConditionSchema = ConditionCheckSchema | ConditionComparisonSchema | ConditionTimePassedSchema | ConditionTimeRangeSchema | ConditionLogicalSchema | ConditionLocationSchema;
export declare type ConditionRefSchema = string;
