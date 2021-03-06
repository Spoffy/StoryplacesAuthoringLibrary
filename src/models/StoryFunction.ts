import {VariableReference} from "./VariableReference";
import {FunctionRefSchema} from "../schemas/multiplayer/FunctionSchema";
import {ConditionRefSchema} from "../schemas/multiplayer/ConditionSchema";
import {HasDependencies, Dependencies} from "../interfaces/Dependencies";
import {ConditionReferenceOrDefinition, IsCondition, ToConditionReference} from "./StoryCondition";

export abstract class StoryFunctionBase implements HasDependencies {
    constructor(
        public id: string,
        public conditions: ConditionReferenceOrDefinition[] = [],
        public functions: StoryFunctionReferenceOrDefinition[] = []) {}

    get dependencies(): Dependencies {
        return {
            conditions: this.conditions.filter(IsCondition),
            functions: this.functions.filter(IsStoryFunction)
        }
    }

    get conditionReferences(): ConditionRefSchema[] {
        return this.conditions.map(ToConditionReference);
    }

    get functionReferences(): FunctionRefSchema[] {
        return this.functions.map(ToStoryFunctionReference);
    }
}

export class StoryFunctionSet extends StoryFunctionBase {
    constructor(
        id: string,
        public variable: VariableReference,
        public value: string,
        conditions?: ConditionRefSchema[],
        functions?: FunctionRefSchema[])
    {
        super(id, conditions, functions);
    }
}

export class StoryFunctionSetRole extends StoryFunctionBase {
    constructor(
        id: string,
        public value: string,
        conditions?: ConditionRefSchema[],
        functions?: FunctionRefSchema[])
    {
        super(id, conditions, functions);
    }
}

export class StoryFunctionSetTimestamp extends StoryFunctionBase {
    constructor(
        id: string,
        public variable: VariableReference,
        conditions?: ConditionRefSchema[],
        functions?: FunctionRefSchema[])
    {
        super(id, conditions, functions);
    }
}

export class StoryFunctionIncrement extends StoryFunctionBase {
    constructor(
        id: string,
        public variable: VariableReference,
        public value: string,
        conditions?: ConditionRefSchema[],
        functions?: FunctionRefSchema[])
    {
        super(id, conditions, functions);
    }
}

export class StoryFunctionChain extends StoryFunctionBase {
    constructor(
        id: string,
        conditions?: ConditionRefSchema[],
        functions?: FunctionRefSchema[])
    {
        super(id, conditions, functions);
    }
}

export type StoryFunction = StoryFunctionSet | StoryFunctionSetRole | StoryFunctionSetTimestamp
                          | StoryFunctionIncrement | StoryFunctionChain;

export type StoryFunctionReferenceOrDefinition = FunctionRefSchema | StoryFunction;

export function IsStoryFunction(refOrFunc: StoryFunctionReferenceOrDefinition): refOrFunc is StoryFunction {
    return typeof refOrFunc != "string";
}

export function ToStoryFunctionReference(refOrFunc: StoryFunctionReferenceOrDefinition): FunctionRefSchema {
    if(typeof refOrFunc == "string") {
        return refOrFunc;
    } else {
        return refOrFunc.id;
    }
}