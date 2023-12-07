import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const commentAPI = createApi({
  reducerPath: 'commentAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8090' }),
  endpoints: (build) => ({
    getComments: build.query({
      query: (credentials) => ({
        url: '/comments/',
        method: 'GET',
        body: credentials,
        headers: { 'content-type': 'application/json' },
      }),
    }),
  }),
});
