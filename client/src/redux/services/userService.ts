import { createApi } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../interface';
import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: baseQueryWithReauth,
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
