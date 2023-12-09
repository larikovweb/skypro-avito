import { FC, ReactNode } from 'react';
import { ModalOverlay } from './ModalOverlay';
import { useModal } from '../../hooks/useModal';

type Props = {
  modal: (props: any) => ReactNode;
  children: ReactNode;
  id: string;
  modalProps?: any;
};

export const ModalControl: FC<Props> = ({ modal, children, id, modalProps }) => {
  const { isOpen, open, close, props } = useModal(id);

  return (
    <>
      <div style={{ cursor: 'pointer', width: 'fit-content' }} onClick={() => open(modalProps)}>
        {children}
      </div>
      {isOpen && (
        <ModalOverlay setOpen={close} open={isOpen}>
          {modal(props)}
        </ModalOverlay>
      )}
    </>
  );
};
