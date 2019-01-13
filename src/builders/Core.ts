import {Story} from "../models/Story";
import {findDependencies} from "../interfaces/Dependencies";
import {Page} from "../models/Page";
import {
    StoryFunction,
    StoryFunctionChain,
    StoryFunctionIncrement,
    StoryFunctionSet,
    StoryFunctionSetRole,
    StoryFunctionSetTimestamp,
    ToStoryFunctionReference
} from "../models/StoryFunction";
import {StorySchema} from "../schemas/core/StorySchema";
import {
    FunctionChainSchema,
    FunctionIncrementSchema,
    FunctionSchema,
    FunctionSetRoleSchema,
    FunctionSetSchema,
    FunctionSetTimestampSchema,
} from "../schemas/core/FunctionSchema";
import {VariableReference} from "../models/VariableReference";
import {VariableReferenceSchema} from "../schemas/core/VariableReferenceSchema";
import {PageSchema} from "../schemas/core/PageSchema";
import {
    StoryCondition,
    StoryConditionCheck,
    StoryConditionComparison,
    StoryConditionIsRole,
    StoryConditionLocation,
    StoryConditionLogical,
    StoryConditionTimePassed,
    StoryConditionTimeRange,
    ToConditionReference,
} from "../models/StoryCondition";
import {RoleSchema} from "../schemas/core/RoleSchema";
import {Role} from "../models/Role";
import {LocationCircleSchema, LocationSchema} from "../schemas/core/LocationSchema";
import {Location} from "../models/Location";
import {MapViewSettings} from "../models/MapViewSettings";
import {MapViewSettingsSchema} from "../schemas/core/MapViewSettingsSchema";
import {
    ConditionCheckSchema,
    ConditionComparisonSchema,
    ConditionIsRoleSchema,
    ConditionLocationSchema,
    ConditionLogicalSchema,
    ConditionSchema,
    ConditionTimePassedSchema,
    ConditionTimeRangeSchema
} from "../schemas/core/ConditionSchema";

/*
=> Initial population
=> Build initial structure
=> Allow objects to populate structure
=> Verify final structure
=> Return
*/

namespace Schema.Builders {

    interface Identifiable {id: any}

    export class Core {
        public build(story: Story): StorySchema {
            let dependencies = findDependencies(story.pages);
            dependencies.functions = this.deduplicateItems(dependencies.functions);
            dependencies.conditions = this.deduplicateItems(dependencies.conditions);

            return {
                name: story.name,
                author: story.author,
                publishState: story.publishState,
                publishDate: story.publishDate,
                roles: story.roles.map(this.buildRole),
                pages: story.pages.map(this.buildPage),
                content: this.buildContentStore(story),
                functions: dependencies.functions.map(this.buildFunction),
                conditions: dependencies.conditions.map(this.buildCondition),
                cachedMediaIds: story.cachedMediaIds,
                locations: story.locations.map(this.buildLocation),
                tags: story.tags,
                pagesMapViewSettings: story.pagesMapViewSettings && this.buildMapViewSettings(story.pagesMapViewSettings),
                schemaVersion: story.schemaVersion,
                audience: story.audience
            }
        }

        public calculateReferenceForPageContent(page: Page) {
            return page.id;
        }

        public buildContentStore(story): {[index: string]: string} {
            let contentStore = {};
            story.pages.forEach(page => {
                contentStore[this.calculateReferenceForPageContent(page)] = page.content;
            });
            return contentStore;
        }

        public buildPage(page: Page): PageSchema {
            return {
                id: page.id,
                name: page.name,
                contentRef: page.contentRef,
                pageTransition: page.pageTransition,
                hint: page.hint.buildContent(),
                functions: page.functions.map(ToStoryFunctionReference),
                conditions: page.conditions.map(ToConditionReference)
            }
        }

        public buildRole(role: Role): RoleSchema {
            return {
                id: role.id,
                required: role.required
            }
        }

        public buildLocation(location: Location): LocationSchema {
            return {
                type: "circle",
                id: location.id,
                lat: location.lat,
                lon: location.lon,
                radius: location.radius
            }
        }

        public buildFunction(func: StoryFunction): FunctionSchema {
            return this.functionBuilders[func.constructor.name](func);
        }

        protected functionBuilders = {
            [StoryFunctionSet.constructor.name]: (func): FunctionSetSchema => {
                return {
                    id: func.id,
                    conditions: func.conditionReferences,
                    functions: func.functionReferences,
                    type: "set",
                    variable: this.buildVariableReference(func.variable),
                    value: func.value
                }
            },
            [StoryFunctionSetRole.constructor.name]: (func): FunctionSetRoleSchema => {
                return {
                    id: func.id,
                    conditions: func.conditionReferences,
                    functions: func.functionReferences,
                    type: "setrole",
                    value: func.value
                }
            },
            [StoryFunctionSetTimestamp.constructor.name]: (func): FunctionSetTimestampSchema => {
                return {
                    id: func.id,
                    conditions: func.conditionReferences,
                    functions: func.functionReferences,
                    type: "settimestamp",
                    variable: this.buildVariableReference(func.variable)
                }
            },
            [StoryFunctionIncrement.constructor.name]: (func): FunctionIncrementSchema => {
                return {
                    id: func.id,
                    conditions: func.conditionReferences,
                    functions: func.functionReferences,
                    type: "increment",
                    variable: this.buildVariableReference(func.variable),
                    value: func.value
                }
            },
            [StoryFunctionChain.constructor.name]: (func): FunctionChainSchema => {
                return {
                    id: func.id,
                    conditions: func.conditionReferences,
                    functions: func.functionReferences,
                    type: "chain"
                }
            }
        };

       public buildCondition(cond: StoryCondition): ConditionSchema {
            return this.conditionBuilders[cond.constructor.name](cond);
       }


        protected conditionBuilders = {
            [StoryConditionLogical.constructor.name]: (cond): ConditionLogicalSchema => {
                return {
                    id: cond.id,
                    type: "logical",
                    operand: cond.operand,
                    conditions: cond.conditions.map(ToConditionReference)
                }
            },
            [StoryConditionComparison.constructor.name]: (cond): ConditionComparisonSchema => {
                return {
                    id: cond.id,
                    type: "comparison",
                    operand: cond.operand,
                    a: typeof cond.a == "string" ? cond.a : this.buildVariableReference(cond.a),
                    b: typeof cond.b == "string" ? cond.b : this.buildVariableReference(cond.b),
                    aType: cond.aType,
                    bType: cond.bType
                }
            },
            [StoryConditionCheck.constructor.name]: (cond): ConditionCheckSchema => {
                return {
                    id: cond.id,
                    type: "check",
                    variable: this.buildVariableReference(cond.variable)
                }
            },
            [StoryConditionLocation.constructor.name]: (cond): ConditionLocationSchema => {
                return {
                    id: cond.id,
                    type: "location",
                    bool: cond.bool,
                    location: cond.location
                }
            },
            [StoryConditionTimePassed.constructor.name]: (cond): ConditionTimePassedSchema => {
                return {
                    id: cond.id,
                    type: "timepassed",
                    minutes: cond.minutes,
                    variable: this.buildVariableReference(cond.variable)
                }
            },
            [StoryConditionTimeRange.constructor.name]: (cond): ConditionTimeRangeSchema => {
                return {
                    id: cond.id,
                    type: "timerange",
                    first: cond.first,
                    last: cond.last
                }
            },
            [StoryConditionIsRole.constructor.name]: (cond): ConditionIsRoleSchema => {
                return {
                    id: cond.id,
                    type: "isrole",
                    role: cond.role
                }
            }
        };

        public buildVariableReference(variableReference: VariableReference): VariableReferenceSchema {
            return {
                scope: variableReference.scope,
                namespace: variableReference.namespace,
                variable: variableReference.variable
            }
        }

        public buildMapViewSettings(mapViewSettings: MapViewSettings): MapViewSettingsSchema {
            return {
                map: mapViewSettings.map,
                pageArrows: mapViewSettings.pageArrows,
                pageDistance: mapViewSettings.pageDistance
            }
        }

        public deduplicateItems<ItemType extends Identifiable>(rawItems: ItemType[]): ItemType[] {
            return rawItems.reduce((processed: ItemType[], currentItem: ItemType) => {
                let itemProcessedWithSameId = processed.find(processedItem =>
                    processedItem.id == currentItem.id
                );

                //De-duplicate: Add function only if not already processed
                if(!itemProcessedWithSameId) {
                    processed.push(currentItem);
                //Throw error if the definitions differ.
                } else if(itemProcessedWithSameId != currentItem) {
                    throw new Error("Two items with id " + currentItem.id + " have different definitions.")
                }
                return processed;
            }, []);
        }
    }


}