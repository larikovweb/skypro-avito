import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { TFields } from '../../interface';

export const articleAPI = createApi({
  reducerPath: 'articleAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8090',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      console.log(token);

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getArticles: build.query({
      query: () => ({
        url: '/ads/',
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      }),
    }),
    createArticle: build.mutation<void, { files: File[]; fields: TFields }>({
      query: ({ files, fields }) => {
        const formData = new FormData();

        files.forEach((file) => formData.append('files', file));

        const queryString = new URLSearchParams(fields as any).toString();

        return {
          url: `/ads/?${queryString}`,
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});
