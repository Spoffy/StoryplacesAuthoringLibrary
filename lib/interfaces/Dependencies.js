"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Array_1 = require("../utilities/Array");
function EmptyDependencies() {
    return {
        conditions: [],
        functions: []
    };
}
exports.EmptyDependencies = EmptyDependencies;
function MergeDependencies(dependencies) {
    return {
        conditions: Array_1.flatten(dependencies.map(function (d) { return d.conditions; })),
        functions: Array_1.flatten(dependencies.map(function (d) { return d.functions; }))
    };
}
exports.MergeDependencies = MergeDependencies;
function findDependencies(startingDependents) {
    return findDependenciesRec(EmptyDependencies(), startingDependents);
}
exports.findDependencies = findDependencies;
function findDependenciesRec(currentDependencies, toProcess) {
    if (toProcess.length == 0) {
        return currentDependencies;
    }
    var nextDependencies = MergeDependencies(toProcess.map(function (thing) { return thing.dependencies; }));
    var nextToProcess = [];
    nextDependencies.conditions.forEach(function (cond) {
        if (currentDependencies.conditions.indexOf(cond) < 0) {
            nextToProcess.push(cond);
        }
        else {
            console.error("Circular dependency on " + cond.id);
        }
    });
    nextDependencies.functions.forEach(function (func) {
        if (currentDependencies.functions.indexOf(func) < 0) {
            nextToProcess.push(func);
        }
        else {
            console.error("Circular dependency on " + func.id);
        }
    });
    currentDependencies = MergeDependencies([currentDependencies, nextDependencies]);
    return findDependenciesRec(currentDependencies, nextToProcess);
}
exports.findDependenciesRec = findDependenciesRec;
//# sourceMappingURL=Dependencies.js.map