import {Role} from "./Role";
import {Page} from "./Page";
import {Location} from "./Location";
import {StoryFunction} from "./StoryFunction";
import {StoryCondition} from "./StoryCondition";
import {MapViewSettings} from "./MapViewSettings";
import {PublishState} from "../schema/PublishState";
import {Audience} from "../schema/Audience";

export class Story {
  name: string;
  author: string;
  publishState: PublishState;
  publishDate?: string;
  roles: [Role];
  pages: [Page]; //Unique
  content: { [index: string]: string; };
  functions: [StoryFunction]; //Unique
  conditions: [StoryCondition]; //Unique
  cachedMediaIds: [string]; //Unique
  locations: [Location]; //Unique
  tags: [string]; //Unique
  pagesMapViewSettings?: MapViewSettings;
  schemaVersion: string;
  audience: Audience;
}
