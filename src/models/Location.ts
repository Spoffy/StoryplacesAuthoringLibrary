import {SchemaContentBuilder} from "../interfaces/SchemaContentBuilder";
import {LocationCircleSchema} from "../schema/LocationSchema";

export class LocationCircle implements SchemaContentBuilder<LocationCircleSchema> {
    id: string;
    lat: number;
    lon: number;
    radius: number;

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
