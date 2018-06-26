import {VariableReference} from "./VariableReference";
import {LocationRef} from "./Location";

export class StoryConditionBase {
    id: string;
}

export enum LogicalOperand {
    AND,
    OR,
    NOR,
    NAND
}

export class StoryConditionLogical extends StoryConditionBase {
    type: "logical";
    operand: LogicalOperand;
    conditions: [StoryConditionRef];
}

export enum ComparisonOperand {
    "==",
    "!=",
    "<=",
    ">=",
    "<",
    ">"
}

export enum ComparisonType {
    Variable,
    Integer,
    String
}

export class StoryConditionComparison extends StoryConditionBase {
    type: "comparison";
    operand: ComparisonOperand;
    a: VariableReference;
    b: VariableReference;
    aType: ComparisonType;
    bType: ComparisonType;
}

export class StoryConditionCheck extends StoryConditionBase {
    type: "check";
    variable: VariableReference;
}

export class StoryConditionLocation extends StoryConditionBase {
    type: "location";
    bool: boolean;
    location: LocationRef;
}


export class StoryConditionTimePassed extends StoryConditionBase {
    type: "timepassed";
    minutes: number;
    variable: VariableReference;
}

export class StoryConditionTimeRange extends StoryConditionBase {
    type: "timerange";
    first: string;
    last: string;
}

export class StoryConditionIsRole extends StoryConditionBase {
    type: "isrole";
    role: string;
}

export type StoryCondition = StoryConditionCheck | StoryConditionComparison | StoryConditionIsRole
                           | StoryConditionTimePassed | StoryConditionTimeRange | StoryConditionLogical
                           | StoryConditionLocation;

export type StoryConditionRef = string;
