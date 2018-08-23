import {VariableReference} from "./VariableReference";
import {
    FunctionChainSchema,
    FunctionIncrementSchema, FunctionRefSchema,
    FunctionSchema,
    FunctionSetRoleSchema,
    FunctionSetSchema,
    FunctionSetTimestampSchema
} from "../schema/FunctionSchema";
import {SchemaContentBuilder} from "../interfaces/SchemaContentBuilder";
import {ConditionRefSchema} from "../schema/ConditionSchema";
import {HasDependencies} from "../interfaces/Dependencies";
import {ConditionReferenceOrDefinition, IsCondition, ToConditionReference} from "./StoryCondition";

export abstract class StoryFunctionBase implements SchemaContentBuilder<FunctionSchema>, HasDependencies {
    constructor(
        public id: string,
        public conditions: ConditionReferenceOrDefinition[] = [],
        public functions: StoryFunctionReferenceOrDefinition[] = []) {}

    get dependencies() {
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

    abstract buildContent(): FunctionSchema;
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


    buildContent(): FunctionSetSchema {
        return {
            id: this.id,
            conditions: this.conditionReferences,
            functions: this.functionReferences,
            type: "set",
            variable: this.variable.buildContent(),
            value: this.value
        }
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

    buildContent(): FunctionSetRoleSchema {
        return {
            id: this.id,
            conditions: this.conditionReferences,
            functions: this.functionReferences,
            type: "setrole",
            value: this.value
        }
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

    buildContent(): FunctionSetTimestampSchema {
        return {
            id: this.id,
            conditions: this.conditionReferences,
            functions: this.functionReferences,
            type: "settimestamp",
            variable: this.variable.buildContent()
        }
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

    buildContent(): FunctionIncrementSchema {
        return {
            id: this.id,
            conditions: this.conditionReferences,
            functions: this.functionReferences,
            type: "increment",
            variable: this.variable.buildContent(),
            value: this.value
        }
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

    //Functions is non-optional here.
    buildContent(): FunctionChainSchema {
        return {
            id: this.id,
            conditions: this.conditionReferences,
            functions: this.functionReferences,
            type: "chain"
        }
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