"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dependencies_1 = require("../interfaces/Dependencies");
var StoryFunction_1 = require("../models/StoryFunction");
var StoryCondition_1 = require("../models/StoryCondition");
var MultiplayerBuilder = (function () {
    function MultiplayerBuilder() {
        var _this = this;
        this.functionBuilders = (_a = {},
            _a[StoryFunction_1.StoryFunctionSet.name] = function (func) {
                return {
                    id: func.id,
                    conditions: func.conditionReferences,
                    functions: func.functionReferences,
                    type: "set",
                    variable: _this.buildVariableReference(func.variable),
                    value: func.value
                };
            },
            _a[StoryFunction_1.StoryFunctionSetRole.name] = function (func) {
                return {
                    id: func.id,
                    conditions: func.conditionReferences,
                    functions: func.functionReferences,
                    type: "setrole",
                    value: func.value
                };
            },
            _a[StoryFunction_1.StoryFunctionSetTimestamp.name] = function (func) {
                return {
                    id: func.id,
                    conditions: func.conditionReferences,
                    functions: func.functionReferences,
                    type: "settimestamp",
                    variable: _this.buildVariableReference(func.variable)
                };
            },
            _a[StoryFunction_1.StoryFunctionIncrement.name] = function (func) {
                return {
                    id: func.id,
                    conditions: func.conditionReferences,
                    functions: func.functionReferences,
                    type: "increment",
                    variable: _this.buildVariableReference(func.variable),
                    value: func.value
                };
            },
            _a[StoryFunction_1.StoryFunctionChain.name] = function (func) {
                return {
                    id: func.id,
                    conditions: func.conditionReferences,
                    functions: func.functionReferences,
                    type: "chain"
                };
            },
            _a);
        this.conditionBuilders = (_b = {},
            _b[StoryCondition_1.StoryConditionLogical.name] = function (cond) {
                return {
                    id: cond.id,
                    type: "logical",
                    operand: cond.operand,
                    conditions: cond.conditions.map(StoryCondition_1.ToConditionReference)
                };
            },
            _b[StoryCondition_1.StoryConditionComparison.name] = function (cond) {
                return {
                    id: cond.id,
                    type: "comparison",
                    operand: cond.operand,
                    a: typeof cond.a == "string" ? cond.a : _this.buildVariableReference(cond.a),
                    b: typeof cond.b == "string" ? cond.b : _this.buildVariableReference(cond.b),
                    aType: cond.aType,
                    bType: cond.bType
                };
            },
            _b[StoryCondition_1.StoryConditionCheck.name] = function (cond) {
                return {
                    id: cond.id,
                    type: "check",
                    variable: _this.buildVariableReference(cond.variable)
                };
            },
            _b[StoryCondition_1.StoryConditionLocation.name] = function (cond) {
                return {
                    id: cond.id,
                    type: "location",
                    bool: cond.bool,
                    location: cond.location
                };
            },
            _b[StoryCondition_1.StoryConditionTimePassed.name] = function (cond) {
                return {
                    id: cond.id,
                    type: "timepassed",
                    minutes: cond.minutes,
                    variable: _this.buildVariableReference(cond.variable)
                };
            },
            _b[StoryCondition_1.StoryConditionTimeRange.name] = function (cond) {
                return {
                    id: cond.id,
                    type: "timerange",
                    first: cond.first,
                    last: cond.last
                };
            },
            _b[StoryCondition_1.StoryConditionIsRole.name] = function (cond) {
                return {
                    id: cond.id,
                    type: "isrole",
                    role: cond.role
                };
            },
            _b);
        var _a, _b;
    }
    MultiplayerBuilder.prototype.build = function (story) {
        var dependencies = Dependencies_1.findDependencies(story.pages);
        dependencies.functions = this.deduplicateItems(dependencies.functions);
        dependencies.conditions = this.deduplicateItems(dependencies.conditions);
        return {
            name: story.name,
            author: story.author,
            publishState: story.publishState,
            publishDate: story.publishDate,
            roles: story.roles.map(this.buildRole),
            pages: story.pages.map(this.buildPage.bind(this)),
            content: this.buildContentStore(story),
            functions: dependencies.functions.map(this.buildFunction.bind(this)),
            conditions: dependencies.conditions.map(this.buildCondition.bind(this)),
            cachedMediaIds: story.cachedMediaIds,
            locations: story.locations.map(this.buildLocation.bind(this)),
            tags: story.tags,
            pagesMapViewSettings: story.pagesMapViewSettings && this.buildMapViewSettings(story.pagesMapViewSettings),
            schemaVersion: story.schemaVersion,
            audience: story.audience
        };
    };
    MultiplayerBuilder.prototype.calculateReferenceForPageContent = function (page) {
        return page.id;
    };
    MultiplayerBuilder.prototype.buildContentStore = function (story) {
        var _this = this;
        var contentStore = {};
        story.pages.forEach(function (page) {
            contentStore[_this.calculateReferenceForPageContent(page)] = page.content;
        });
        return contentStore;
    };
    MultiplayerBuilder.prototype.buildPage = function (page) {
        return {
            id: page.id,
            name: page.name,
            contentRef: page.contentRef,
            pageTransition: page.pageTransition,
            hint: this.buildPageHint(page.hint),
            functions: page.functions.map(StoryFunction_1.ToStoryFunctionReference),
            conditions: page.conditions.map(StoryCondition_1.ToConditionReference)
        };
    };
    MultiplayerBuilder.prototype.buildPageHint = function (hint) {
        return {
            direction: hint.direction,
            locations: hint.locations
        };
    };
    MultiplayerBuilder.prototype.buildRole = function (role) {
        return {
            id: role.id,
            required: role.required
        };
    };
    MultiplayerBuilder.prototype.buildLocation = function (location) {
        return {
            type: "circle",
            id: location.id,
            lat: location.lat,
            lon: location.lon,
            radius: location.radius
        };
    };
    MultiplayerBuilder.prototype.buildFunction = function (func) {
        return this.functionBuilders[func.constructor.name](func);
    };
    MultiplayerBuilder.prototype.buildCondition = function (cond) {
        return this.conditionBuilders[cond.constructor.name](cond);
    };
    MultiplayerBuilder.prototype.buildVariableReference = function (variableReference) {
        return {
            scope: variableReference.scope,
            namespace: variableReference.namespace,
            variable: variableReference.variable
        };
    };
    MultiplayerBuilder.prototype.buildMapViewSettings = function (mapViewSettings) {
        return {
            map: mapViewSettings.map,
            pageArrows: mapViewSettings.pageArrows,
            pageDistance: mapViewSettings.pageDistance
        };
    };
    MultiplayerBuilder.prototype.deduplicateItems = function (rawItems) {
        return rawItems.reduce(function (processed, currentItem) {
            var itemProcessedWithSameId = processed.find(function (processedItem) {
                return processedItem.id == currentItem.id;
            });
            if (!itemProcessedWithSameId) {
                processed.push(currentItem);
            }
            else if (itemProcessedWithSameId != currentItem) {
                throw new Error("Two items with id " + currentItem.id + " have different definitions.");
            }
            return processed;
        }, []);
    };
    return MultiplayerBuilder;
}());
exports.MultiplayerBuilder = MultiplayerBuilder;
//# sourceMappingURL=Multiplayer.js.map