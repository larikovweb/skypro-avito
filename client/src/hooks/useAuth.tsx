import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setCredentials, logout } from '../redux/slices/authSlice';
import { authAPI } from '../redux/services/authService';

export function useAuth() {
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((state: RootState) => state.auth);
  const [updateToken] = authAPI.useUpdateTokenMutation();

  const refreshAuthToken = useCallback(async () => {
    if (refreshToken && accessToken) {
      try {
        const newTokens = await updateToken({
          access_token: accessToken,
          refresh_token: refreshToken,
        }).unwrap();
        dispatch(
          setCredentials({
            accessToken: newTokens.access_token,
            refreshToken: newTokens.refresh_token,
          }),
        );
      } catch (error) {
        console.error('Failed to refresh access token:', error);
        dispatch(logout());
      }
    }
  }, [dispatch, updateToken, refreshToken, accessToken]);

  const performLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    accessToken,
    isAuth: !!accessToken,
    logout: performLogout,
    refreshAuthToken,
  };
}
