import { createApi } from '@reduxjs/toolkit/query/react';
import { IArticle, IComment, TFields } from '../../interface';
import { createQueryString } from '../../helpers/api';
import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const articleAPI = createApi({
  reducerPath: 'articleAPI',
  baseQuery: baseQueryWithReauth,
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
    getArticle: build.query<IArticle, number>({
      query: (id) => ({
        url: `/ads/${id}`,
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      }),
      providesTags: () => [{ type: 'Article', id: 'ARTICLE' }],
    }),
    createArticle: build.mutation<IArticle, { files: File[]; fields: TFields }>({
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
    createNotImageArticle: build.mutation<IArticle, TFields>({
      query: (fields) => ({
        url: '/adstext/',
        method: 'POST',
        body: fields,
      }),
      invalidatesTags: () => [{ type: 'Article', id: 'LIST' }],
    }),
    deleteArticle: build.mutation<void, number>({
      query: (id) => ({
        url: `/ads/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'Article', id: 'LIST' }],
    }),
    getMyArticles: build.query<IArticle[], { sorting?: string; page?: number }>({
      query: (fields) => {
        const queryString = createQueryString(fields);

        return {
          url: `/ads/me?${queryString}`,
          method: 'GET',
        };
      },
      providesTags: () => [{ type: 'Article', id: 'ARTICLE' }],
    }),
    updateArticle: build.mutation<void, { id: number; fields: TFields }>({
      query: ({ id, fields }) => ({
        url: `/ads/${id}`,
        method: 'PATCH',
        body: fields,
      }),
      invalidatesTags: () => [{ type: 'Article', id: 'ARTICLE' }],
    }),

    updateImage: build.mutation<void, { id: number; file: File }>({
      query: ({ id, file }) => {
        const formData = new FormData();

        formData.append('file', file);

        return {
          url: `/ads/${id}/image/`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: () => [{ type: 'Article', id: 'ARTICLE' }],
    }),
    deleteImage: build.mutation<void, { id: number; file_url: string }>({
      query: ({ id, file_url }) => {
        const queryString = createQueryString({ file_url });

        return {
          url: `/ads/${id}/image?${queryString}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: () => [{ type: 'Article', id: 'ARTICLE' }],
    }),
    createComment: build.mutation<IComment, { article_id: number; text: string }>({
      query: ({ article_id, text }) => ({
        url: `/ads/${article_id}/comments/`,
        method: 'POST',
        body: { text },
      }),
      invalidatesTags: () => [{ type: 'Article', id: 'COMMENT' }],
    }),
    getComments: build.query<IComment[], number>({
      query: (id) => ({
        url: `/ads/${id}/comments/`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'Article', id: 'COMMENT' }],
    }),
  }),
});
