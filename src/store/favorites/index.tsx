// store/favoritesSlice.js
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the graph types to limit to specific string values
export type GraphType =
  | 'RectangleLine'
  | 'LineGraph'
  | 'BarGraph'
  | 'SleepGraph';

interface Favorite {
  category: string;
  title: string;
  graphType: GraphType;
  label: string;
  descriptor: string;
}

// Define an interface for the favorite's data structure
interface FavoriteData {
  graphType: GraphType;
  lastUpdated: number | null;
  data: any; // replace 'any' with the actual data type you expect
}

// Define the shape of your state
interface FavoritesState {
  favorites: string[];
  data: Record<string, FavoriteData>;
  favoritesList: Favorite[]; // Add this line
}

export interface UpdateFavoritePayload {
  key: string;
  newData: any; // replace 'any' with the actual data type you expect
  lastUpdated?: number; // Optional lastUpdated timestamp
}

const favoritesList: Favorite[] = [
  {
    category: 'Heart',
    title: 'Heart Rate',
    graphType: 'RectangleLine',
    label: 'BPM',
    descriptor: 'Latest',
  },
  // {
  //   category: 'Heart',
  //   title: 'Heart Rate Variability',
  //   graphType: 'LineGraph',
  //   label: 'ms',
  //   descriptor: 'Latest',
  // },
  // {
  //   category: 'Heart',
  //   title: 'Resting Heart Rate',
  //   graphType: 'LineGraph',
  //   label: 'BPM',
  //   descriptor: 'Latest',
  // },
  // {
  //   category: 'Heart',
  //   title: 'VO2 Max',
  //   graphType: 'LineGraph',
  //   label: 'ml/kg/min',
  //   descriptor: 'Latest',
  // },
  // {
  //   category: 'Activity',
  //   title: 'Distance',
  //   graphType: 'BarGraph',
  //   label: 'km',
  //   descriptor: 'Latest',
  // },
  // {
  //   category: 'Activity',
  //   title: 'Sleep Analysis',
  //   graphType: 'SleepGraph',
  //   label: '',
  //   descriptor: 'Sleep Time',
  // },
  // {
  //   category: 'Activity',
  //   title: 'Energy Burned',
  //   graphType: 'BarGraph',
  // },

  // {
  //   category: 'Activity',
  //   title: 'Exercise Time',
  //   graphType: 'BarGraph',
  // },
];

const initialState: FavoritesState = {
  favorites: favoritesList.map(favorite => favorite.title),
  data: favoritesList.reduce<Record<string, FavoriteData>>((acc, favorite) => {
    acc[favorite.title] = {
      graphType: favorite.graphType,
      lastUpdated: null,
      data: null,
    };
    return acc;
  }, {}),
  favoritesList, // Add this line
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<{key: string}>) => {
      const {key} = action.payload;
      // Add key to favorites array if not already present
      if (!state.favorites.includes(key)) {
        state.favorites.push(key);
      }
    },
    removeFavorite: (state, action: PayloadAction<{key: string}>) => {
      const {key} = action.payload;
      // Filter out the key to remove
      state.favorites = state.favorites.filter(favKey => favKey !== key);
    },
    updateFavoriteData: (
      state,
      action: PayloadAction<UpdateFavoritePayload>,
    ) => {
      const {key, newData, lastUpdated} = action.payload;
      // Merge new data while preserving graphType
      if (state.data[key]) {
        // existing key, safe to update
        state.data[key] = {
          ...state.data[key],
          data: newData,
          lastUpdated: lastUpdated ?? Date.now(), // Use provided lastUpdated if available
        };
      } else {
        // handle case where key doesn't exist, possibly add it or raise an error
        console.error(`Key ${key} not found in favorites data`);
      }
      // Remove the key and add it back to the beginning
      state.favorites = state.favorites.filter(favKey => favKey !== key);
      state.favorites.unshift(key);
    },
  },
});

export const {addFavorite, removeFavorite, updateFavoriteData} =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
