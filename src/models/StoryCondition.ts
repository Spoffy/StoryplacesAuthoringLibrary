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
} from "../schema/ConditionSchema";
import {LocationRefSchema} from "../schema/LocationSchema";

export abstract class StoryConditionBase implements SchemaContentBuilder<ConditionSchema> {
    id: string;

    abstract buildContent(): ConditionSchema;
}

export class StoryConditionLogical extends StoryConditionBase {
    operand: LogicalOperand;
    conditions: ConditionRefSchema[];

    buildContent(): ConditionLogicalSchema {
        return {
            id: this.id,
            type: "logical",
            operand: this.operand,
            conditions: this.conditions
        }
    }
}

export class StoryConditionComparison extends StoryConditionBase {
    operand: ComparisonOperand;
    a: VariableReference;
    b: VariableReference;
    aType: ComparisonType;
    bType: ComparisonType;

    buildContent(): ConditionComparisonSchema {
        return {
            id: this.id,
            type: "comparison",
            operand: this.operand,
            a: this.a.buildContent(),
            b: this.b.buildContent(),
            aType: this.aType,
            bType: this.bType
        }
    }
}

export class StoryConditionCheck extends StoryConditionBase {
    variable: VariableReference;

    buildContent(): ConditionCheckSchema {
        return {
            id: this.id,
            type: "check",
            variable: this.variable.buildContent()
        }
    }
}

export class StoryConditionLocation extends StoryConditionBase {
    bool: boolean;
    location: LocationRefSchema;

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
    minutes: number;
    variable: VariableReference;

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
    first: string;
    last: string;

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
    role: string;

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
