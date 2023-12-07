import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../interface';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8090',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    register: build.mutation<
      IUser,
      {
        email: string;
        password: string;
        repeatPassword?: string;
        name?: string;
        surname?: string;
        city?: string;
      }
    >({
      query: (credentials) => ({
        url: '/auth/register/',
        method: 'POST',
        body: credentials,
        headers: { 'content-type': 'application/json' },
      }),
    }),
    login: build.mutation<
      {
        access_token: string;
        refresh_token: string;
        token_type: string;
      },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: '/auth/login/',
        method: 'POST',
        body: credentials,
        headers: { 'content-type': 'application/json' },
      }),
    }),
    updateToken: build.mutation<
      {
        access_token: string;
        refresh_token: string;
        token_type: string;
      },
      {
        access_token: string;
        refresh_token: string;
      }
    >({
      query: (credentials) => ({
        url: '/auth/login/',
        method: 'PUT',
        body: credentials,
        headers: { 'content-type': 'application/json' },
      }),
    }),
  }),
});
