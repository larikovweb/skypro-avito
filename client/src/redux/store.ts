import { combineReducers, configureStore } from '@reduxjs/toolkit/react';
import { useDispatch } from 'react-redux';
import modal from './slices/modalSlice';
import auth from './slices/authSlice';
import { authAPI } from './services/authService';
import { userAPI } from './services/userService';
import { articleAPI } from './services/articleService';
import { commentAPI } from './services/commentService';

const rootReducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [articleAPI.reducerPath]: articleAPI.reducer,
  [commentAPI.reducerPath]: commentAPI.reducer,
  modal,
  auth,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authAPI.middleware,
        userAPI.middleware,
        articleAPI.middleware,
        commentAPI.middleware,
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
