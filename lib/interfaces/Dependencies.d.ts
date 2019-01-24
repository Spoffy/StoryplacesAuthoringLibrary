import { StoryFunction } from "../models/StoryFunction";
import { StoryCondition } from "../models/StoryCondition";
export interface Dependencies {
    conditions: StoryCondition[];
    functions: StoryFunction[];
}
export interface HasDependencies {
    readonly dependencies: Dependencies;
}
export declare function EmptyDependencies(): Dependencies;
export declare function MergeDependencies(dependencies: Dependencies[]): Dependencies;
export declare function findDependencies(startingDependents: HasDependencies[]): Dependencies;
export declare function findDependenciesRec(currentDependencies: Dependencies, toProcess: HasDependencies[]): Dependencies;
