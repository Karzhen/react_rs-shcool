import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '../types';

export const StarAPI = createApi({
    reducerPath: 'starAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
    endpoints: (builder) => ({
        fetchResults: builder.query<ApiResponse, { searchTerm: string; pageNumber: number }>({
            query: ({ searchTerm, pageNumber }) => `people/?search=${searchTerm}&page=${pageNumber}`,
        }),
    }),
});
  
export const { useFetchResultsQuery } = StarAPI;
