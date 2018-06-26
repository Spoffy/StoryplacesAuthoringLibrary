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
    constructor(
    public name: string,
    public author: string,
    public publishState: PublishStateSchema,
    public roles: Role[],
    public pages: Page[], //Unique
    public content: { [index: string]: string },
    public functions: StoryFunction[], //Unique
    public conditions: StoryCondition[], //Unique
    public cachedMediaIds: string[], //Unique
    public locations: Location[], //Unique
    public tags: string[], //Unique
    public schemaVersion: string,
    public audience: AudienceSchema,
    public publishDate?: string,
    public pagesMapViewSettings?: MapViewSettings) {}

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
