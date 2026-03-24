export interface USGSGeometry {
  type: 'Point';
  coordinates: [number, number, number]; // [longitude, latitude, depth]
}

export interface USGSProperties {
  mag: number;
  place: string;
  time: number;
  updated: number;
  tz: number | null;
  url: string;
  detail: string;
  felt: number | null;
  cdi: number | null;
  mmi: number | null;
  alert: string | null;
  status: string;
  tsunami: number;
  sig: number;
  net: string;
  code: string;
  ids: string;
  sources: string;
  types: string;
  nst: number | null;
  dmin: number | null;
  rms: number | null;
  gap: number | null;
  magType: string;
  type: string;
  title: string;
}

export interface EarthquakeFeature {
  type: 'Feature';
  properties: USGSProperties;
  geometry: USGSGeometry;
  id: string;
}

export interface USGSFeatureCollection {
  type: 'FeatureCollection';
  metadata: {
    generated: number;
    url: string;
    title: string;
    status: number;
    api: string;
    count: number;
  };
  features: EarthquakeFeature[];
  bbox?: number[];
}

export interface EarthquakeDetailProps {
  id: string;
  properties: {
    mag: number;
    place: string;
    time: number;
    updated: number;
    status: string;
    tsunami: number;
    sig: number;
    net: string;
    magType: string;
    type: string;
    title: string;
    alert: string | null;
    felt: number | null;
    cdi: number | null;
    mmi: number | null;
    dmin: number | null;
    gap: number | null;
    rms: number | null;
    nst: number | null;
    url: string;
    products: {
      origin?: Array<{
        properties: {
          depth: string;
          latitude: string;
          longitude: string;
          'num-stations-used': string;
          'num-phases-used': string;
          'horizontal-error': string;
          'vertical-error': string;
          'azimuthal-gap': string;
          'magnitude-error': string;
        };
      }>;
    };
  };
  geometry: {
    coordinates: [number, number, number];
  };
}