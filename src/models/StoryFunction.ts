import {VariableReference} from "./VariableReference";
import {StoryConditionRef} from "./StoryCondition";

export interface StoryFunctionBase {
    id: string;
    conditions: [StoryConditionRef];
    functions?: [StoryFunctionRef]; //Unique
}

export interface StoryFunctionSet extends StoryFunctionBase {
    type: "set";
    variable: VariableReference;
    value: string;
}

export interface StoryFunctionSetRole extends StoryFunctionBase {
    type: "setrole";
    value: string;
}

export interface StoryFunctionSetTimestamp extends StoryFunctionBase {
    type: "settimestamp";
    variable: VariableReference;
}

export interface StoryFunctionIncrement extends StoryFunctionBase {
    type: "increment";
    variable: VariableReference;
    value: string;
}

export interface StoryFunctionChain extends StoryFunctionBase {
    type: "chain";
    //Functions is non-optional here.
}

export type StoryFunction = StoryFunctionSet | StoryFunctionSetRole | StoryFunctionSetTimestamp
                          | StoryFunctionIncrement | StoryFunctionChain;

export type StoryFunctionRef = string;