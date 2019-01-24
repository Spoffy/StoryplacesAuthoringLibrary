import { VariableReferenceSchema } from "./VariableReferenceSchema";
import { ConditionRefSchema } from "./ConditionSchema";
export interface FunctionBaseSchema {
    id: string;
    conditions: ConditionRefSchema[];
    functions?: FunctionRefSchema[];
}
export interface FunctionSetSchema extends FunctionBaseSchema {
    type: "set";
    variable: VariableReferenceSchema;
    value: string;
}
export interface FunctionSetRoleSchema extends FunctionBaseSchema {
    type: "setrole";
    value: string;
}
export interface FunctionSetTimestampSchema extends FunctionBaseSchema {
    type: "settimestamp";
    variable: VariableReferenceSchema;
}
export interface FunctionIncrementSchema extends FunctionBaseSchema {
    type: "increment";
    variable: VariableReferenceSchema;
    value: string;
}
export interface FunctionChainSchema extends FunctionBaseSchema {
    type: "chain";
}
export declare type FunctionSchema = FunctionSetSchema | FunctionSetRoleSchema | FunctionSetTimestampSchema | FunctionIncrementSchema | FunctionChainSchema;
export declare type FunctionRefSchema = string;
