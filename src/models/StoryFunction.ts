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

export abstract class StoryFunctionBase implements SchemaContentBuilder<FunctionSchema> {
    constructor(
        public id: string,
        public conditions: ConditionRefSchema[] = [],
        public functions: FunctionRefSchema[] = []) {}

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
            conditions: this.conditions,
            functions: this.functions,
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
            conditions: this.conditions,
            functions: this.functions,
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
            conditions: this.conditions,
            functions: this.functions,
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
            conditions: this.conditions,
            functions: this.functions,
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
            conditions: this.conditions,
            functions: this.functions,
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