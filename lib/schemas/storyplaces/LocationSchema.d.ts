export interface LocationCircleSchema {
    type: "circle";
    id: string;
    lat: number;
    lon: number;
    radius: number;
}
export declare type LocationSchema = LocationCircleSchema;
export declare type LocationRefSchema = string;
