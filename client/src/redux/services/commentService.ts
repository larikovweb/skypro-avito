import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '../../utils/consts';

export const commentAPI = createApi({
  reducerPath: 'commentAPI',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
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
