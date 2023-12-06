import { FC, ReactNode } from 'react';

import { ModalOverlay } from './ModalOverlay';
import { useModal } from '../../hooks/useModal';

type Props = {
  modal: ReactNode;
  children: ReactNode;
  id: string;
};

export const ModalControl: FC<Props> = ({ modal, children, id }) => {
  const { isOpen, open, close } = useModal(id);

  return (
    <>
      <div style={{ cursor: 'pointer', width: 'fit-content' }} onClick={open}>
        {children}
      </div>
      <ModalOverlay setOpen={close} open={isOpen}>
        {modal}
      </ModalOverlay>
    </>
  );
};
