import { PublishState } from "./PublishState";
import { PageSchema } from "./PageSchema";
import { Audience } from "./AudienceSchema";
import { LocationSchema } from "./LocationSchema";
import { FunctionSchema } from "./FunctionSchema";
import { ConditionSchema } from "./ConditionSchema";
import { MapViewSettingsSchema } from "./MapViewSettingsSchema";
export interface StoryPlacesStorySchema {
    name: string;
    author: string;
    publishState: PublishState;
    publishDate?: string;
    pages: PageSchema[];
    functions: FunctionSchema[];
    conditions: ConditionSchema[];
    cachedMediaIds: string[];
    locations: LocationSchema[];
    tags: string[];
    pagesMapViewSettings?: MapViewSettingsSchema;
    schemaVersion: string;
    audience: Audience;
}
