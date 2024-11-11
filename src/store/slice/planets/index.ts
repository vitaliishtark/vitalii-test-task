import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResults } from '../../service/planet/interface.ts';
import { planetApi } from '../../service/planet';
import { extractIdFromUrl } from '../../../util';

interface IInitialState {
  planets: IResults[];
  favorites: IResults[];
}

const initialState: IInitialState = {
  planets: [],
  favorites: [],
};
const planetSlice = createSlice({
  name: 'planet',
  initialState,
  reducers: {
    changeFavorite: (
      state,
      action: PayloadAction<{ name: string; favorite: boolean }>
    ) => {
      const { name, favorite } = action.payload;
      state.planets = state.planets.map((p) =>
        p.name === name ? { ...p, favorite: favorite } : p
      );
      if (favorite) {
        const existingFavorite = state.favorites.find((p) => p.name === name);
        if (!existingFavorite) {
          const planet = state.planets.find((p) => p.name === name);
          if (planet) {
            state.favorites.push(planet);
          }
        }
      } else {
        state.favorites = state.favorites.filter((p) => p.name !== name);
      }
    },
    updatePlanetName: (
      state,
      action: PayloadAction<{ oldName: string; newName: string }>
    ) => {
      const { oldName, newName } = action.payload;
      state.planets = state.planets.map((p) =>
        p.name === oldName ? { ...p, name: newName } : p
      );
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      planetApi.endpoints.getPlanets.matchFulfilled,
      (state, action) => {
        state.planets = action.payload.results.map((planet) => ({
          ...planet,
          favorite: false,
          id: extractIdFromUrl(planet.url) as string,
        }));
      }
    );
  },
});

export const { changeFavorite, updatePlanetName } = planetSlice.actions;
export default planetSlice.reducer;
