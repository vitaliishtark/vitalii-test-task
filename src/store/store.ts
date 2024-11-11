import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { planetApi } from './service/planet';
import planets from './slice/planets';

const rootReducer = combineReducers({
  planets: planets,
  [planetApi.reducerPath]: planetApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(planetApi.middleware),
});
setupListeners(store.dispatch);
