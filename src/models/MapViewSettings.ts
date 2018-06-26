import {SchemaContentBuilder} from "../interfaces/SchemaContentBuilder";
import {MapViewSettingsSchema} from "../schema/MapViewSettingsSchema";

export class MapViewSettings implements SchemaContentBuilder<MapViewSettingsSchema> {
    map?: boolean;
    pageArrows?: boolean;
    pageDistance?: boolean;

    buildContent(): MapViewSettingsSchema {
        return {
            map: this.map,
            pageArrows: this.pageArrows,
            pageDistance: this.pageDistance
        }
    }
}