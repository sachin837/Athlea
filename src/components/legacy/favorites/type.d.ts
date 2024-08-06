export type GraphType =
  | 'RectangleLine'
  | 'LineGraph'
  | 'BarGraph'
  | 'SleepGraph';

export interface FavoriteItem {
  key: string;
  graphType: GraphType; // The GraphType you defined earlier
  lastUpdated: number | null;
  data: any; // Replace 'any' with the appropriate data structure you're expecting
  title?: string; // If you have title in the FavoriteData, make it optional as it seems to be not present in the initial FavoriteData structure
}
