import { createApi } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../interface';
import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    register: build.mutation<
      IUser,
      {
        password: string;
        email: string;
        role?: string;
        name?: string;
        surname?: string;
        phone?: string;
        city?: string;
      }
    >({
      query: (credentials) => ({
        url: '/auth/register/',
        method: 'POST',
        body: credentials,
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
      }),
      extraOptions: {},
    }),
  }),
});
