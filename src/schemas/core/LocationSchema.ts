export interface LocationCircleSchema {
    type: "circle";
    id: string;
    lat: number;
    lon: number;
    radius: number;
}

export type LocationSchema = LocationCircleSchema;
export type LocationRefSchema = string;
