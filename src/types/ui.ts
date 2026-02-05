export interface VisualizationItem {
  id: string;
  title: string;
  image: string;
  link?: string;
}

export interface OptionsPanelProps {
  earthquakeData: import('./store').EarthquakeContextData;
}