declare module "leaflet-geosearch" {
    import { Control, Map } from "leaflet";
  
    export class OpenStreetMapProvider {
      constructor(options?: Record<string, unknown>);
      search(options: { query: string }): Promise<Array<{ label: string; x: number; y: number }>>;
    }
  
    export class GeoSearchControl extends Control {
      constructor(options?: Record<string, unknown>);
    }
  }