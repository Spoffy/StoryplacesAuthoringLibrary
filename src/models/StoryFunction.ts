import {VariableReference} from "./VariableReference";
import {StoryConditionRef} from "./StoryCondition";

export class StoryFunctionBase {
    id: string;
    conditions: [StoryConditionRef];
    functions?: [StoryFunctionRef]; //Unique
}

export class StoryFunctionSet extends StoryFunctionBase {
    type: "set";
    variable: VariableReference;
    value: string;
}

export class StoryFunctionSetRole extends StoryFunctionBase {
    type: "setrole";
    value: string;
}

export class StoryFunctionSetTimestamp extends StoryFunctionBase {
    type: "settimestamp";
    variable: VariableReference;
}

export class StoryFunctionIncrement extends StoryFunctionBase {
    type: "increment";
    variable: VariableReference;
    value: string;
}

export class StoryFunctionChain extends StoryFunctionBase {
    type: "chain";
    //Functions is non-optional here.
}

export type StoryFunction = StoryFunctionSet | StoryFunctionSetRole | StoryFunctionSetTimestamp
                          | StoryFunctionIncrement | StoryFunctionChain;

export type StoryFunctionRef = string;