import {SchemaContentBuilder} from "../interfaces/SchemaContentBuilder";
import {LocationCircleSchema} from "../schemas/core/LocationSchema";

export class LocationCircle implements SchemaContentBuilder<LocationCircleSchema> {
    constructor(
        public id: string,
        public lat: number,
        public lon: number,
        public radius: number) {}

    buildContent(): LocationCircleSchema {
        return {
            type: "circle",
            id: this.id,
            lat: this.lat,
            lon: this.lon,
            radius: this.radius
        }
    }
}

export type Location = LocationCircle;
