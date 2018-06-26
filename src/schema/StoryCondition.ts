import {VariableReference} from "./VariableReference";
import {LocationRef} from "./Location";

export interface StoryConditionBase {
    id: string;
}

export enum LogicalOperand {
    AND,
    OR,
    NOR,
    NAND
}

export interface StoryConditionLogical extends StoryConditionBase {
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

export interface StoryConditionComparison extends StoryConditionBase {
    type: "comparison";
    operand: ComparisonOperand;
    a: VariableReference;
    b: VariableReference;
    aType: ComparisonType;
    bType: ComparisonType;
}

export interface StoryConditionCheck extends StoryConditionBase {
    type: "check";
    variable: VariableReference;
}

export interface StoryConditionLocation extends StoryConditionBase {
    type: "location";
    bool: boolean;
    location: LocationRef;
}


export interface StoryConditionTimePassed extends StoryConditionBase {
    type: "timepassed";
    minutes: number;
    variable: VariableReference;
}

export interface StoryConditionTimeRange extends StoryConditionBase {
    type: "timerange";
    first: string;
    last: string;
}

export interface StoryConditionIsRole extends StoryConditionBase {
    type: "isrole";
    role: string;
}

export type StoryCondition = StoryConditionCheck | StoryConditionComparison | StoryConditionIsRole
                           | StoryConditionTimePassed | StoryConditionTimeRange | StoryConditionLogical
                           | StoryConditionLocation;

export type StoryConditionRef = string;
