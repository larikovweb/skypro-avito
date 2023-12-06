import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { closeModal, openModal } from '../redux/slices/modalSlice';

export const useModal = (id: string) => {
  const dispatch = useDispatch();
  const currentModal = useSelector((state: RootState) => state.modal.currentModal);
  const isOpen = currentModal === id;
  const close = () => dispatch(closeModal());
  const open = () => dispatch(openModal(id));
  return { isOpen, close, open };
};
