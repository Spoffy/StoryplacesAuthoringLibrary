import {Role} from "./Role";
import {Page} from "./Page";
import {Location} from "./Location";
import {StoryFunction} from "./StoryFunction";
import {StoryCondition} from "./StoryCondition";
import {MapViewSettings} from "./MapViewSettings";
import {PublishStateSchema} from "../schema/PublishStateSchema";
import {AudienceSchema} from "../schema/AudienceSchema";
import {SchemaContentBuilder} from "../interfaces/SchemaContentBuilder";
import {StorySchema} from "../schema/StorySchema";

export class Story implements SchemaContentBuilder<StorySchema> {
    name: string;
    author: string;
    publishState: PublishStateSchema;
    publishDate?: string;
    roles: Role[];
    pages: Page[]; //Unique
    content: { [index: string]: string; };
    functions: StoryFunction[]; //Unique
    conditions: StoryCondition[]; //Unique
    cachedMediaIds: string[]; //Unique
    locations: Location[]; //Unique
    tags: string[]; //Unique
    pagesMapViewSettings?: MapViewSettings;
    schemaVersion: string;
    audience: AudienceSchema;

    buildContent(): StorySchema {
        return {
            name: this.name,
            author: this.author,
            publishState: this.publishState,
            publishDate: this.publishDate,
            roles: this.roles.map(role => role.buildContent()),
            pages: this.pages.map(page => page.buildContent()),
            content: this.content,
            functions: this.functions.map(func => func.buildContent()),
            conditions: this.conditions.map(cond => cond.buildContent()),
            cachedMediaIds: this.cachedMediaIds,
            locations: this.locations.map(location => location.buildContent()),
            tags: this.tags,
            pagesMapViewSettings: this.pagesMapViewSettings.buildContent(),
            schemaVersion: this.schemaVersion,
            audience: this.audience
        }
    }
}
