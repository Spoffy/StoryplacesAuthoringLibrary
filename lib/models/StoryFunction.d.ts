import { VariableReference } from "./VariableReference";
import { FunctionRefSchema } from "../schemas/multiplayer/FunctionSchema";
import { ConditionRefSchema } from "../schemas/multiplayer/ConditionSchema";
import { HasDependencies, Dependencies } from "../interfaces/Dependencies";
import { ConditionReferenceOrDefinition } from "./StoryCondition";
export declare abstract class StoryFunctionBase implements HasDependencies {
    id: string;
    conditions: ConditionReferenceOrDefinition[];
    functions: StoryFunctionReferenceOrDefinition[];
    constructor(id: string, conditions?: ConditionReferenceOrDefinition[], functions?: StoryFunctionReferenceOrDefinition[]);
    readonly dependencies: Dependencies;
    readonly conditionReferences: ConditionRefSchema[];
    readonly functionReferences: FunctionRefSchema[];
}
export declare class StoryFunctionSet extends StoryFunctionBase {
    variable: VariableReference;
    value: string;
    constructor(id: string, variable: VariableReference, value: string, conditions?: ConditionRefSchema[], functions?: FunctionRefSchema[]);
}
export declare class StoryFunctionSetRole extends StoryFunctionBase {
    value: string;
    constructor(id: string, value: string, conditions?: ConditionRefSchema[], functions?: FunctionRefSchema[]);
}
export declare class StoryFunctionSetTimestamp extends StoryFunctionBase {
    variable: VariableReference;
    constructor(id: string, variable: VariableReference, conditions?: ConditionRefSchema[], functions?: FunctionRefSchema[]);
}
export declare class StoryFunctionIncrement extends StoryFunctionBase {
    variable: VariableReference;
    value: string;
    constructor(id: string, variable: VariableReference, value: string, conditions?: ConditionRefSchema[], functions?: FunctionRefSchema[]);
}
export declare class StoryFunctionChain extends StoryFunctionBase {
    constructor(id: string, conditions?: ConditionRefSchema[], functions?: FunctionRefSchema[]);
}
export declare type StoryFunction = StoryFunctionSet | StoryFunctionSetRole | StoryFunctionSetTimestamp | StoryFunctionIncrement | StoryFunctionChain;
export declare type StoryFunctionReferenceOrDefinition = FunctionRefSchema | StoryFunction;
export declare function IsStoryFunction(refOrFunc: StoryFunctionReferenceOrDefinition): refOrFunc is StoryFunction;
export declare function ToStoryFunctionReference(refOrFunc: StoryFunctionReferenceOrDefinition): FunctionRefSchema;
