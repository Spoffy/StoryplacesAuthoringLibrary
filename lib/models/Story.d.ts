import { Role } from "./Role";
import { Page } from "./Page";
import { Location } from "./Location";
import { MapViewSettings } from "./MapViewSettings";
import { PublishState } from "../schemas/multiplayer/PublishState";
import { Audience } from "../schemas/multiplayer/AudienceSchema";
export declare class Story {
    name: string;
    constructor(name: string);
    author: string;
    publishState: PublishState;
    roles: Role[];
    pages: Page[];
    cachedMediaIds: string[];
    locations: Location[];
    tags: string[];
    schemaVersion: string;
    audience: Audience;
    publishDate?: string;
    pagesMapViewSettings?: MapViewSettings;
}
