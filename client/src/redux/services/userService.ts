import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../interface';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8090' }),
  endpoints: (build) => ({
    getUsers: build.query({
      query: (credentials) => ({
        url: '/user/all/',
        method: 'GET',
        body: credentials,
        headers: { 'content-type': 'application/json' },
      }),
    }),
    getActiveUser: build.query({
      query: (credentials) => ({
        url: '/user/',
        method: 'GET',
        body: credentials,
        headers: { 'content-type': 'application/json' },
      }),
    }),
    updateActiveUser: build.mutation<IUser, IUser>({
      query: (credentials) => ({
        url: '/user/',
        method: 'PATCH',
        body: credentials,
        headers: { 'content-type': 'application/json' },
      }),
    }),
    uploadAvatarUser: build.mutation<IUser, FormData>({
      query: (credentials) => ({
        url: '/user/avatar/',
        method: 'POST',
        body: credentials,
        headers: { 'content-type': 'application/json' },
      }),
    }),
  }),
});
