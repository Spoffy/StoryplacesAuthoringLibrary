import {Story} from "../models/Story";
import {findDependencies} from "../interfaces/Dependencies";
import {Page} from "../models/Page";
import {
    StoryFunction,
    StoryFunctionChain,
    StoryFunctionIncrement,
    StoryFunctionSet,
    StoryFunctionSetTimestamp,
    ToStoryFunctionReference
} from "../models/StoryFunction";
import {
    FunctionChainSchema,
    FunctionIncrementSchema,
    FunctionSchema,
    FunctionSetSchema,
    FunctionSetTimestampSchema,
} from "../schemas/storyplaces/FunctionSchema";
import {VariableReference} from "../models/VariableReference";
import {VariableReferenceSchema} from "../schemas/storyplaces/VariableReferenceSchema";
import {PageSchema} from "../schemas/storyplaces/PageSchema";
import {
    StoryCondition,
    StoryConditionCheck,
    StoryConditionComparison,
    StoryConditionLocation,
    StoryConditionLogical,
    StoryConditionTimePassed,
    StoryConditionTimeRange,
    ToConditionReference,
} from "../models/StoryCondition";
import {LocationSchema} from "../schemas/storyplaces/LocationSchema";
import {Location} from "../models/Location";
import {MapViewSettings} from "../models/MapViewSettings";
import {MapViewSettingsSchema} from "../schemas/storyplaces/MapViewSettingsSchema";
import {
    ConditionCheckSchema,
    ConditionComparisonSchema,
    ConditionLocationSchema,
    ConditionLogicalSchema,
    ConditionSchema,
    ConditionTimePassedSchema,
    ConditionTimeRangeSchema
} from "../schemas/storyplaces/ConditionSchema";
import {PageHint} from "../models/PageHint";
import {PageHintSchema} from "../schemas/storyplaces/PageHintSchema";
import {StoryPlacesStorySchema} from "../schemas/storyplaces/StorySchema";

/*
=> Initial population
=> Build initial structure
=> Allow objects to populate structure
=> Verify final structure
=> Return
*/

export interface Identifiable {id: any}

export class StoryPlacesBuilder {
    public build(story: Story): StoryPlacesStorySchema {
        let dependencies = findDependencies(story.pages);
        dependencies.functions = this.deduplicateItems(dependencies.functions);
        dependencies.conditions = this.deduplicateItems(dependencies.conditions);

        return {
            name: story.name,
            author: story.author,
            publishState: story.publishState,
            publishDate: story.publishDate,
            pages: story.pages.map(this.buildPage.bind(this)),
            functions: dependencies.functions.map(this.buildFunction.bind(this)),
            conditions: dependencies.conditions.map(this.buildCondition.bind(this)),
            cachedMediaIds: story.cachedMediaIds,
            locations: story.locations.map(this.buildLocation.bind(this)),
            tags: story.tags,
            pagesMapViewSettings: story.pagesMapViewSettings && this.buildMapViewSettings(story.pagesMapViewSettings),
            schemaVersion: story.schemaVersion,
            audience: story.audience
        }
    }

    public calculateReferenceForPageContent(page: Page) {
        return page.id;
    }

    public buildPage(page: Page): PageSchema {
        return {
            id: page.id,
            name: page.name,
            content: page.content,
            pageTransition: page.pageTransition,
            hint: this.buildPageHint(page.hint),
            functions: page.functions.map(ToStoryFunctionReference),
            conditions: page.conditions.map(ToConditionReference)
        }
    }

    public buildPageHint(hint: PageHint): PageHintSchema {
        return {
            direction: hint.direction,
            locations: hint.locations
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
        return this.functionBuilders[(func as any).constructor.name](func);
    }

    protected functionBuilders = {
        [StoryFunctionSet.name]: (func): FunctionSetSchema => {
            return {
                id: func.id,
                conditions: func.conditionReferences,
                functions: func.functionReferences,
                type: "set",
                variable: this.buildVariableReference(func.variable),
                value: func.value
            }
        },
        [StoryFunctionSetTimestamp.name]: (func): FunctionSetTimestampSchema => {
            return {
                id: func.id,
                conditions: func.conditionReferences,
                functions: func.functionReferences,
                type: "settimestamp",
                variable: this.buildVariableReference(func.variable)
            }
        },
        [StoryFunctionIncrement.name]: (func): FunctionIncrementSchema => {
            return {
                id: func.id,
                conditions: func.conditionReferences,
                functions: func.functionReferences,
                type: "increment",
                variable: this.buildVariableReference(func.variable),
                value: func.value
            }
        },
        [StoryFunctionChain.name]: (func): FunctionChainSchema => {
            return {
                id: func.id,
                conditions: func.conditionReferences,
                functions: func.functionReferences,
                type: "chain"
            }
        }
    };

    public buildCondition(cond: StoryCondition): ConditionSchema {
        return this.conditionBuilders[(cond as any).constructor.name](cond);
    }

    protected conditionBuilders = {
        [StoryConditionLogical.name]: (cond): ConditionLogicalSchema => {
            return {
                id: cond.id,
                type: "logical",
                operand: cond.operand,
                conditions: cond.conditions.map(ToConditionReference)
            }
        },
        [StoryConditionComparison.name]: (cond): ConditionComparisonSchema => {
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
        [StoryConditionCheck.name]: (cond): ConditionCheckSchema => {
            return {
                id: cond.id,
                type: "check",
                variable: this.buildVariableReference(cond.variable)
            }
        },
        [StoryConditionLocation.name]: (cond): ConditionLocationSchema => {
            return {
                id: cond.id,
                type: "location",
                bool: cond.bool,
                location: cond.location
            }
        },
        [StoryConditionTimePassed.name]: (cond): ConditionTimePassedSchema => {
            return {
                id: cond.id,
                type: "timepassed",
                minutes: cond.minutes,
                variable: this.buildVariableReference(cond.variable)
            }
        },
        [StoryConditionTimeRange.name]: (cond): ConditionTimeRangeSchema => {
            return {
                id: cond.id,
                type: "timerange",
                first: cond.first,
                last: cond.last
            }
        }
    };

    public buildVariableReference(variableReference: VariableReference): VariableReferenceSchema {
        return `${variableReference.scope}->${variableReference.namespace}->${variableReference.variable}`;
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
