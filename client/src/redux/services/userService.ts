import { createApi } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../interface';
import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
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
      providesTags: () => [{ type: 'User', id: 'USER' }],
    }),
    updateActiveUser: build.mutation<
      IUser,
      {
        role?: string;
        name?: string;
        email: string;
        surname?: string;
        phone?: string;
        city?: string;
      }
    >({
      query: (credentials) => ({
        url: '/user/',
        method: 'PATCH',
        body: credentials,
      }),
      invalidatesTags: () => [{ type: 'User', id: 'USER' }],
    }),
    uploadAvatarUser: build.mutation<IUser, File | null>({
      query: (credentials) => {
        const formData = new FormData();
        if (credentials) {
          formData.append('file', credentials);
        }

        return {
          url: '/user/avatar/',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: () => [{ type: 'User', id: 'USER' }],
    }),
  }),
});
