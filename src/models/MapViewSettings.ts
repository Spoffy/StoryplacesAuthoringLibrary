import {SchemaContentBuilder} from "../interfaces/SchemaContentBuilder";
import {MapViewSettingsSchema} from "../schema/MapViewSettingsSchema";

export class MapViewSettings implements SchemaContentBuilder<MapViewSettingsSchema> {
    constructor(
        public map: boolean = true,
        public pageArrows: boolean = true,
        public pageDistance: boolean = false) {}

    buildContent(): MapViewSettingsSchema {
        return {
            map: this.map,
            pageArrows: this.pageArrows,
            pageDistance: this.pageDistance
        }
    }
}