import {VariableReference} from "./VariableReference";
import {SchemaContentBuilder} from "../interfaces/SchemaContentBuilder";
import {
    ComparisonOperand,
    ComparisonType,
    ConditionCheckSchema,
    ConditionComparisonSchema, ConditionIsRoleSchema,
    ConditionLocationSchema,
    ConditionLogicalSchema,
    ConditionRefSchema,
    ConditionSchema,
    ConditionTimePassedSchema, ConditionTimeRangeSchema,
    LogicalOperand
} from "../schemas/core/ConditionSchema";
import {LocationRefSchema} from "../schemas/core/LocationSchema";
import {StoryFunction, StoryFunctionReferenceOrDefinition} from "./StoryFunction";
import {EmptyDependencies, HasDependencies} from "../interfaces/Dependencies";

export abstract class StoryConditionBase implements SchemaContentBuilder<ConditionSchema>, HasDependencies {
    constructor(public id: string) {}

    abstract buildContent(): ConditionSchema;

    get dependencies() {
        return EmptyDependencies();
    }
}

export class StoryConditionLogical extends StoryConditionBase {
    constructor(
        id: string,
        public operand: LogicalOperand,
        public conditions: ConditionReferenceOrDefinition[] = [])
    {
            super(id);
    }

    get dependencies() {
        let myDependencies = EmptyDependencies();
        myDependencies.conditions = this.conditions.filter(IsCondition);
        return myDependencies;
    }

    buildContent(): ConditionLogicalSchema {
        return {
            id: this.id,
            type: "logical",
            operand: this.operand,
            conditions: this.conditions.map(ToConditionReference)
        }
    }
}

export class StoryConditionComparison extends StoryConditionBase {
    constructor(
        id: string,
        public operand: ComparisonOperand,
        public a: string | VariableReference,
        public b: string | VariableReference,
        public aType: ComparisonType,
        public bType: ComparisonType)
    {
        super(id);
    }

    buildContent(): ConditionComparisonSchema {
        return {
            id: this.id,
            type: "comparison",
            operand: this.operand,
            a: typeof this.a == "string"? this.a : this.a.buildContent(),
            b: typeof this.b == "string"? this.b : this.b.buildContent(),
            aType: this.aType,
            bType: this.bType
        }
    }
}

export class StoryConditionCheck extends StoryConditionBase {
    constructor(id: string, public variable: VariableReference) {
        super(id);
    }

    buildContent(): ConditionCheckSchema {
        return {
            id: this.id,
            type: "check",
            variable: this.variable.buildContent()
        }
    }
}

export class StoryConditionLocation extends StoryConditionBase {
    constructor(
        id: string,
        public bool: boolean,
        public location: LocationRefSchema)
    {
        super(id);
    }

    buildContent(): ConditionLocationSchema {
        return {
            id: this.id,
            type: "location",
            bool: this.bool,
            location: this.location
        }
    }
}


export class StoryConditionTimePassed extends StoryConditionBase {
    constructor(
        id: string,
        public minutes: number,
        public variable: VariableReference)
    {
        super(id);
    }

    buildContent(): ConditionTimePassedSchema {
        return {
            id: this.id,
            type: "timepassed",
            minutes: this.minutes,
            variable: this.variable.buildContent()
        }
    }
}

export class StoryConditionTimeRange extends StoryConditionBase {
    constructor(
        id: string,
        public first: string,
        public last: string)
    {
        super(id);
    }

    buildContent(): ConditionTimeRangeSchema {
        return {
            id: this.id,
            type: "timerange",
            first: this.first,
            last: this.last
        }
    }
}

export class StoryConditionIsRole extends StoryConditionBase {
    constructor(id: string, public role: string) {
        super(id);
    }

    buildContent(): ConditionIsRoleSchema {
        return {
            id: this.id,
            type: "isrole",
            role: this.role
        }
    }
}

export type StoryCondition = StoryConditionCheck | StoryConditionComparison | StoryConditionIsRole
                           | StoryConditionTimePassed | StoryConditionTimeRange | StoryConditionLogical
                           | StoryConditionLocation;

export type ConditionReferenceOrDefinition = ConditionRefSchema | StoryCondition;

export function IsCondition(refOrCond: ConditionReferenceOrDefinition): refOrCond is StoryCondition {
    return typeof refOrCond != "string";
}

export function ToConditionReference(refOrCond: ConditionReferenceOrDefinition): ConditionRefSchema {
    if(typeof refOrCond == "string") {
        return refOrCond;
    } else {
        return refOrCond.id;
    }
}
