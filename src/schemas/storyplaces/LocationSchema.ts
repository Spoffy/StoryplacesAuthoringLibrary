export interface LocationCircleSchema {
    type: "circle";
    id: string;
    //Between -90 and 90
    lat: number;
    //Between -180 and 180
    lon: number;
    //Minimum 0
    radius: number;
}

export type LocationSchema = LocationCircleSchema;
export type LocationRefSchema = string;
