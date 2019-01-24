import { Story } from "../models/Story";
import { Page } from "../models/Page";
import { StoryFunction } from "../models/StoryFunction";
import { StorySchema } from "../schemas/multiplayer/StorySchema";
import { FunctionChainSchema, FunctionIncrementSchema, FunctionSchema, FunctionSetRoleSchema, FunctionSetSchema, FunctionSetTimestampSchema } from "../schemas/multiplayer/FunctionSchema";
import { VariableReference } from "../models/VariableReference";
import { VariableReferenceSchema } from "../schemas/multiplayer/VariableReferenceSchema";
import { PageSchema } from "../schemas/multiplayer/PageSchema";
import { StoryCondition } from "../models/StoryCondition";
import { RoleSchema } from "../schemas/multiplayer/RoleSchema";
import { Role } from "../models/Role";
import { LocationSchema } from "../schemas/multiplayer/LocationSchema";
import { Location } from "../models/Location";
import { MapViewSettings } from "../models/MapViewSettings";
import { MapViewSettingsSchema } from "../schemas/multiplayer/MapViewSettingsSchema";
import { ConditionCheckSchema, ConditionComparisonSchema, ConditionIsRoleSchema, ConditionLocationSchema, ConditionLogicalSchema, ConditionSchema, ConditionTimePassedSchema, ConditionTimeRangeSchema } from "../schemas/multiplayer/ConditionSchema";
import { PageHint } from "../models/PageHint";
import { PageHintSchema } from "../schemas/multiplayer/PageHintSchema";
export interface Identifiable {
    id: any;
}
export declare class MultiplayerBuilder {
    build(story: Story): StorySchema;
    calculateReferenceForPageContent(page: Page): string;
    buildContentStore(story: any): {
        [index: string]: string;
    };
    buildPage(page: Page): PageSchema;
    buildPageHint(hint: PageHint): PageHintSchema;
    buildRole(role: Role): RoleSchema;
    buildLocation(location: Location): LocationSchema;
    buildFunction(func: StoryFunction): FunctionSchema;
    protected functionBuilders: {
        [x: string]: ((func: any) => FunctionSetSchema) | ((func: any) => FunctionSetRoleSchema) | ((func: any) => FunctionSetTimestampSchema) | ((func: any) => FunctionIncrementSchema) | ((func: any) => FunctionChainSchema);
    };
    buildCondition(cond: StoryCondition): ConditionSchema;
    protected conditionBuilders: {
        [x: string]: ((cond: any) => ConditionLogicalSchema) | ((cond: any) => ConditionComparisonSchema) | ((cond: any) => ConditionCheckSchema) | ((cond: any) => ConditionLocationSchema) | ((cond: any) => ConditionTimePassedSchema) | ((cond: any) => ConditionTimeRangeSchema) | ((cond: any) => ConditionIsRoleSchema);
    };
    buildVariableReference(variableReference: VariableReference): VariableReferenceSchema;
    buildMapViewSettings(mapViewSettings: MapViewSettings): MapViewSettingsSchema;
    deduplicateItems<ItemType extends Identifiable>(rawItems: ItemType[]): ItemType[];
}
