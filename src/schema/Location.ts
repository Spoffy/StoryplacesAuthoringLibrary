export interface LocationCircle {
    type: "circle";
    id: string;
    lat: number;
    lon: number;
    radius: number;
}

export type Location = LocationCircle;
export type LocationRef = string;
