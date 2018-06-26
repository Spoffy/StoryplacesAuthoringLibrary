import {VariableReferenceSchema} from "./VariableReferenceSchema";
import {ConditionRefSchema} from "./ConditionSchema";

export interface FunctionBaseSchema {
    id: string;
    conditions: ConditionRefSchema[];
    functions?: FunctionRefSchema[]; //Unique
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
    //Functions is non-optional here.
}

export type FunctionSchema = FunctionSetSchema | FunctionSetRoleSchema | FunctionSetTimestampSchema
                          | FunctionIncrementSchema | FunctionChainSchema;

export type FunctionRefSchema = string;