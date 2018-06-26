import {PageHintSchema} from "../schema/PageHintSchema";
import {SchemaContentBuilder} from "../interfaces/SchemaContentBuilder";

export class PageHint implements SchemaContentBuilder<PageHintSchema> {
    direction: string;
    locations: [string];

    buildContent(): PageHintSchema {
        return {
            direction: this.direction,
            locations: this.locations
        }
    }
}
