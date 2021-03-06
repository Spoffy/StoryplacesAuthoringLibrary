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
    functions: FunctionRefSchema[];
}
export declare type FunctionSchema = FunctionSetSchema | FunctionSetTimestampSchema | FunctionIncrementSchema | FunctionChainSchema;
export declare type FunctionRefSchema = string;
