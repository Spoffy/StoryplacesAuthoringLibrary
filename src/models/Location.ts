export class LocationCircle  {
    constructor(
        public id: string,
        public lat: number,
        public lon: number,
        public radius: number) {}
}

export type Location = LocationCircle;
