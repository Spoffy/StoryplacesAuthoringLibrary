import {PublishState} from "./PublishState";
import {RoleSchema} from "./RoleSchema";
import {PageSchema} from "./PageSchema";
import {Audience} from "./AudienceSchema";
import {LocationSchema} from "./LocationSchema";
import {FunctionSchema} from "./FunctionSchema";
import {ConditionSchema} from "./ConditionSchema";
import {MapViewSettingsSchema} from "./MapViewSettingsSchema";

export interface MultiplayerStorySchema {
  name: string;
  author: string;
  publishState: PublishState;
  publishDate?: string;
  roles: RoleSchema[];
  pages: PageSchema[]; //Unique
  content: { [index: string]: string; };
  functions: FunctionSchema[]; //Unique
  conditions: ConditionSchema[]; //Unique
  cachedMediaIds: string[]; //Unique
  locations: LocationSchema[]; //Unique
  tags: string[]; //Unique
  pagesMapViewSettings?: MapViewSettingsSchema;
  schemaVersion: string;
  audience: Audience;
}
