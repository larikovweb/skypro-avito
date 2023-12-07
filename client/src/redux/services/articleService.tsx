import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articleAPI = createApi({
  reducerPath: 'articleAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8090' }),
  endpoints: (build) => ({
    getArticles: build.query({
      query: () => ({
        url: '/ads/',
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      }),
    }),
    createArticle: build.mutation({
      query: (credentials) => ({
        url: '/ads/',
        method: 'POST',
        body: credentials,
        headers: { 'content-type': 'application/json' },
      }),
    }),
  }),
});
