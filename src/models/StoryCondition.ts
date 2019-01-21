import {VariableReference} from "./VariableReference";
import {ComparisonOperand, ComparisonType, ConditionRefSchema, LogicalOperand} from "../schemas/multiplayer/ConditionSchema";
import {LocationRefSchema} from "../schemas/multiplayer/LocationSchema";
import {EmptyDependencies, HasDependencies} from "../interfaces/Dependencies";

export abstract class StoryConditionBase implements HasDependencies {
    constructor(public id: string) {}

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
}

export class StoryConditionCheck extends StoryConditionBase {
    constructor(id: string, public variable: VariableReference) {
        super(id);
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
}


export class StoryConditionTimePassed extends StoryConditionBase {
    constructor(
        id: string,
        public minutes: number,
        public variable: VariableReference)
    {
        super(id);
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
}

export class StoryConditionIsRole extends StoryConditionBase {
    constructor(id: string, public role: string) {
        super(id);
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
