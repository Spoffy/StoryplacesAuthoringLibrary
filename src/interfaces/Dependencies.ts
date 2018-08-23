import {StoryFunction} from "../models/StoryFunction";
import {StoryCondition} from "../models/StoryCondition";
import {flatten} from "../utilities/Array";

export interface Dependencies {
    conditions: StoryCondition[],
    functions: StoryFunction[]
}

export interface HasDependencies {
    readonly dependencies: Dependencies;
}

export function EmptyDependencies(): Dependencies {
    return {
        conditions: [],
        functions: []
    }
}

export function MergeDependencies(dependencies: Dependencies[]): Dependencies {
    return {
        conditions: flatten(dependencies.map(d => d.conditions)),
        functions: flatten(dependencies.map(d => d.functions))
    }
}
