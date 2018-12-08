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

export function findDependencies(startingDependents: HasDependencies[]): Dependencies {
    return findDependenciesRec(EmptyDependencies(), startingDependents);
}

export function findDependenciesRec(currentDependencies: Dependencies, toProcess: HasDependencies[]): Dependencies {
    if(toProcess.length == 0) { return currentDependencies; }
    let nextDependencies = MergeDependencies(toProcess.map(thing => thing.dependencies));
    let nextToProcess: HasDependencies[] = [];

    nextDependencies.conditions.forEach((cond) => {
        //Process it if we haven't already
        if(currentDependencies.conditions.indexOf(cond) < 0) {
            nextToProcess.push(cond);
        } else {
            console.error("Circular dependency on " + cond.id)
        }
    });

    nextDependencies.functions.forEach((func) => {
        if(currentDependencies.functions.indexOf(func) < 0) {
            nextToProcess.push(func);
        } else {
            console.error("Circular dependency on " + func.id)
        }
    });

    //Merge after the checks to avoid adding to the dependencies as we iterate.
    currentDependencies = MergeDependencies([currentDependencies, nextDependencies]);
    return this.calculateDependenciesRec(currentDependencies, nextToProcess);
}
