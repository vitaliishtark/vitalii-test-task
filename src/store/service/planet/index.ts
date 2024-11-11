import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getPlanet } from './planet-req.ts';
import { apiUrl } from '../../../util';
import { IPlanet } from './interface.ts';
export const planetApi = createApi({
  reducerPath: 'planetApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  tagTypes: ['planet'],
  endpoints: (builder) => ({
    getPlanets: builder.query<IPlanet, void>({
      query: getPlanet,
      providesTags: ['planet'],
    }),
  }),
});

export const { useGetPlanetsQuery } = planetApi;
