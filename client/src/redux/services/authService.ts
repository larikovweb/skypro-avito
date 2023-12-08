import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../interface';
import { RootState } from '../store';
import { SERVER_URL } from '../../utils/consts';

export const authAPI = createApi({
  reducerPath: 'authAPI',
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
    }),
  }),
});
