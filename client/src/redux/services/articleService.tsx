import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { IArticle, TFields } from '../../interface';
import { createQueryString } from '../../helpers/api';
import { SERVER_URL } from '../../utils/consts';

export const articleAPI = createApi({
  reducerPath: 'articleAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Article'],
  endpoints: (build) => ({
    getArticles: build.query<IArticle[], { user_id?: string; sorting?: string; page?: number }>({
      query: (fields) => {
        const queryString = createQueryString(fields);

        return {
          url: `/ads/?${queryString}`,
          method: 'GET',
          headers: { 'content-type': 'application/json' },
        };
      },
      providesTags: () => [{ type: 'Article', id: 'LIST' }],
    }),
    getArticle: build.query({
      query: (id) => ({
        url: `/ads/${id}`,
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      }),
    }),
    createArticle: build.mutation<void, { files: File[]; fields: TFields }>({
      query: ({ files, fields }) => {
        const formData = new FormData();

        files.forEach((file) => formData.append('files', file));

        const queryString = createQueryString(fields);

        return {
          url: `/ads/?${queryString}`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: () => [{ type: 'Article', id: 'LIST' }],
    }),
    deleteArticle: build.mutation<void, number>({
      query: (id) => ({
        url: `/ads/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'Article', id: 'LIST' }],
    }),
  }),
});
