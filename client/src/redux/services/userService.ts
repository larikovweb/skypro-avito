import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../interface';
import { RootState } from '../store';
import { SERVER_URL } from '../../utils/consts';

export const userAPI = createApi({
  reducerPath: 'userAPI',
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
    getUsers: build.query<IUser[], unknown>({
      query: () => ({
        url: '/user/all/',
        method: 'GET',
      }),
    }),
    getActiveUser: build.query<IUser, unknown>({
      query: () => ({
        url: '/user/',
        method: 'GET',
      }),
    }),
    updateActiveUser: build.mutation<IUser, IUser>({
      query: (credentials) => ({
        url: '/user/',
        method: 'PATCH',
        body: credentials,
      }),
    }),
    uploadAvatarUser: build.mutation<IUser, File>({
      query: (credentials) => {
        const formData = new FormData();
        formData.append('file', credentials);

        return {
          url: '/user/avatar/',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});
