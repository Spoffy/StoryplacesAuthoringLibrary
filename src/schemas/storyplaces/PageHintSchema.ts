export interface PageHintSchema {
  direction: string;
  //Technically a LocationReference, but that's just a string.
  locations: string[];
}
