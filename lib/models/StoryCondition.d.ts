import { VariableReference } from "./VariableReference";
import { ComparisonOperand, ComparisonType, ConditionRefSchema, LogicalOperand } from "../schemas/multiplayer/ConditionSchema";
import { LocationRefSchema } from "../schemas/multiplayer/LocationSchema";
import { Dependencies, HasDependencies } from "../interfaces/Dependencies";
export declare abstract class StoryConditionBase implements HasDependencies {
    id: string;
    constructor(id: string);
    readonly dependencies: Dependencies;
}
export declare class StoryConditionLogical extends StoryConditionBase {
    operand: LogicalOperand;
    conditions: ConditionReferenceOrDefinition[];
    constructor(id: string, operand: LogicalOperand, conditions?: ConditionReferenceOrDefinition[]);
    readonly dependencies: Dependencies;
}
export declare class StoryConditionComparison extends StoryConditionBase {
    operand: ComparisonOperand;
    a: string | VariableReference;
    b: string | VariableReference;
    aType: ComparisonType;
    bType: ComparisonType;
    constructor(id: string, operand: ComparisonOperand, a: string | VariableReference, b: string | VariableReference, aType: ComparisonType, bType: ComparisonType);
}
export declare class StoryConditionCheck extends StoryConditionBase {
    variable: VariableReference;
    constructor(id: string, variable: VariableReference);
}
export declare class StoryConditionLocation extends StoryConditionBase {
    bool: boolean;
    location: LocationRefSchema;
    constructor(id: string, bool: boolean, location: LocationRefSchema);
}
export declare class StoryConditionTimePassed extends StoryConditionBase {
    minutes: number;
    variable: VariableReference;
    constructor(id: string, minutes: number, variable: VariableReference);
}
export declare class StoryConditionTimeRange extends StoryConditionBase {
    first: string;
    last: string;
    constructor(id: string, first: string, last: string);
}
export declare class StoryConditionIsRole extends StoryConditionBase {
    role: string;
    constructor(id: string, role: string);
}
export declare type StoryCondition = StoryConditionCheck | StoryConditionComparison | StoryConditionIsRole | StoryConditionTimePassed | StoryConditionTimeRange | StoryConditionLogical | StoryConditionLocation;
export declare type ConditionReferenceOrDefinition = ConditionRefSchema | StoryCondition;
export declare function IsCondition(refOrCond: ConditionReferenceOrDefinition): refOrCond is StoryCondition;
export declare function ToConditionReference(refOrCond: ConditionReferenceOrDefinition): ConditionRefSchema;
