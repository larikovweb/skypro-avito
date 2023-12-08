import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interface';

type TInitialState = {
  activeUser: IUser | null;
};

const initialState: TInitialState = {
  activeUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUser>) => {
      state.activeUser = action.payload;
    },
    logout: (state) => {
      state.activeUser = null;
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
