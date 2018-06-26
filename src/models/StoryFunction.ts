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
    id: string;
    conditions: ConditionRefSchema[] = [];
    functions: FunctionRefSchema[] = []; //Unique

    abstract buildContent(): FunctionSchema;
}

export class StoryFunctionSet extends StoryFunctionBase {
    type: "set";
    variable: VariableReference;
    value: string;

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
    value: string;

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
    variable: VariableReference;

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
    variable: VariableReference;
    value: string;

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
