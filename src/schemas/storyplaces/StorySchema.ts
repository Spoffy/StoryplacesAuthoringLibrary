import {PublishState} from "./PublishState";
import {PageSchema} from "./PageSchema";
import {Audience} from "./AudienceSchema";
import {LocationSchema} from "./LocationSchema";
import {FunctionSchema} from "./FunctionSchema";
import {ConditionSchema} from "./ConditionSchema";
import {MapViewSettingsSchema} from "./MapViewSettingsSchema";

export interface StorySchema {
  name: string;
  author: string;
  publishState: PublishState;
  publishDate?: string;
  pages: PageSchema[]; //Unique
  functions: FunctionSchema[]; //Unique
  conditions: ConditionSchema[]; //Unique
  cachedMediaIds: string[]; //Unique
  locations: LocationSchema[]; //Unique
  tags: string[]; //Unique
  pagesMapViewSettings?: MapViewSettingsSchema;
  schemaVersion: string;
  audience: Audience;
}
