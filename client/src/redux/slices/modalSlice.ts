import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  currentModal: string | null;
  props: any;
}

const initialState: ModalState = {
  currentModal: null,
  props: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ id: string; props?: any }>) => {
      const { id, props } = action.payload;
      state.currentModal = id;
      state.props = props || {};
    },
    closeModal: (state) => {
      state.currentModal = null;
      state.props = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
