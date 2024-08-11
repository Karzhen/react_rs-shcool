import type { Action, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '@/types';
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from '@/redux/store';

export const StarAPI = createApi({
    reducerPath: 'starAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return (action.payload as any)[reducerPath]
        }
    },
    tagTypes: [],
    endpoints: (builder) => ({
        fetchResults: builder.query<
            ApiResponse,
            { searchTerm: string; pageNumber: number }
        >({
            query: ({ searchTerm = '', pageNumber= 1 }) =>
                `people/?search=${searchTerm}&page=${pageNumber}`,
        }),
    }),
});

// export const { useFetchResultsQuery } = StarAPI;

export const {
    useFetchResultsQuery,
    util: { getRunningQueriesThunk },
} = StarAPI;

export const { fetchResults } = StarAPI.endpoints;
