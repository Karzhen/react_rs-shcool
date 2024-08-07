import type { Action, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '@/types';
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from '@/redux/store';

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
    return action.type === HYDRATE
}

export const StarAPI = createApi({
    reducerPath: 'starAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (isHydrateAction(action)) {
            return action.payload[reducerPath]
        }
    },
    tagTypes: [],
    endpoints: (builder) => ({
        fetchResults: builder.query<
            ApiResponse,
            { searchTerm: string; pageNumber: number }
        >({
            query: ({ searchTerm, pageNumber }) =>
                `people/?search=${searchTerm}&page=${pageNumber}`,
        }),
    }),
});

export const { useFetchResultsQuery } = StarAPI;

export const {
    useGetCharactersQuery,
    util: { getRunningQueriesThunk },
} = StarAPI;