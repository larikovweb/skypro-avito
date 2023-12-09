import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { closeModal, openModal } from '../redux/slices/modalSlice';

export const useModal = (id: string) => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.modal);
  const isOpen = modalState.currentModal === id;
  const props = modalState.props;
  const close = () => dispatch(closeModal());
  const open = (props?: any) => dispatch(openModal({ id, props }));
  return { isOpen, close, open, props };
};
