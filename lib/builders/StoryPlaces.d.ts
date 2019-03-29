import { Story } from "../models/Story";
import { Page } from "../models/Page";
import { StoryFunction } from "../models/StoryFunction";
import { FunctionChainSchema, FunctionIncrementSchema, FunctionSchema, FunctionSetSchema, FunctionSetTimestampSchema } from "../schemas/storyplaces/FunctionSchema";
import { VariableReference } from "../models/VariableReference";
import { VariableReferenceSchema } from "../schemas/storyplaces/VariableReferenceSchema";
import { PageSchema } from "../schemas/storyplaces/PageSchema";
import { StoryCondition } from "../models/StoryCondition";
import { LocationSchema } from "../schemas/storyplaces/LocationSchema";
import { Location } from "../models/Location";
import { MapViewSettings } from "../models/MapViewSettings";
import { MapViewSettingsSchema } from "../schemas/storyplaces/MapViewSettingsSchema";
import { ConditionCheckSchema, ConditionComparisonSchema, ConditionLocationSchema, ConditionLogicalSchema, ConditionSchema, ConditionTimePassedSchema, ConditionTimeRangeSchema } from "../schemas/storyplaces/ConditionSchema";
import { PageHint } from "../models/PageHint";
import { PageHintSchema } from "../schemas/storyplaces/PageHintSchema";
import { StoryPlacesStorySchema } from "../schemas/storyplaces/StorySchema";
export interface Identifiable {
    id: any;
}
export declare class StoryPlacesBuilder {
    build(story: Story): StoryPlacesStorySchema;
    calculateReferenceForPageContent(page: Page): string;
    buildPage(page: Page): PageSchema;
    buildPageHint(hint: PageHint): PageHintSchema;
    buildLocation(location: Location): LocationSchema;
    buildFunction(func: StoryFunction): FunctionSchema;
    protected functionBuilders: {
        [x: string]: ((func: any) => FunctionSetSchema) | ((func: any) => FunctionSetTimestampSchema) | ((func: any) => FunctionIncrementSchema) | ((func: any) => FunctionChainSchema);
    };
    buildCondition(cond: StoryCondition): ConditionSchema;
    protected conditionBuilders: {
        [x: string]: ((cond: any) => ConditionLogicalSchema) | ((cond: any) => ConditionComparisonSchema) | ((cond: any) => ConditionCheckSchema) | ((cond: any) => ConditionLocationSchema) | ((cond: any) => ConditionTimePassedSchema) | ((cond: any) => ConditionTimeRangeSchema);
    };
    buildVariableReference(variableReference: VariableReference): VariableReferenceSchema;
    buildMapViewSettings(mapViewSettings: MapViewSettings): MapViewSettingsSchema;
    deduplicateItems<ItemType extends Identifiable>(rawItems: ItemType[]): ItemType[];
}
