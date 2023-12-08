import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { setCredentials } from './slices/authSlice';
import { RootState } from './store';
import { SERVER_URL } from '../utils/consts';

type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
};

const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && 'status' in result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: '/auth/login/',
        method: 'PUT',
        body: {
          refresh_token: (api.getState() as RootState).auth.refreshToken,
          access_token: (api.getState() as RootState).auth.accessToken,
        },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const { access_token, refresh_token } = refreshResult.data as RefreshTokenResponse;
      api.dispatch(
        setCredentials({
          accessToken: access_token,
          refreshToken: refresh_token,
        }),
      );

      if (!args.headers) {
        args.headers = new Headers();
      }
      if (args.headers instanceof Headers) {
        args.headers.set('Authorization', `Bearer ${access_token}`);
      } else {
        args.headers['Authorization'] = `Bearer ${access_token}`;
      }

      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
