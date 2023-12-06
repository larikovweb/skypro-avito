import styled from '@emotion/styled';
import { FC } from 'react';
import { FadeTransition } from '../animations/Transitions';
import { GeneralSubtitle } from '../../styled/components';
import { IconClose } from '../../icons';
import { $primaryColor } from '../../styled/variables';

type Props = {
  open?: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
};

export const ModalOverlay: FC<Props> = ({ open = false, children, setOpen }) => {
  return (
    <FadeTransition in={open}>
      <Wrapper>
        <Overlay onClick={() => setOpen(false)} />
        <Content>{children}</Content>
      </Wrapper>
    </FadeTransition>
  );
};

export const ModalHead: FC<{ children: React.ReactNode; close: () => void }> = ({
  children,
  close,
}) => {
  return (
    <Head>
      <GeneralSubtitle>{children}</GeneralSubtitle>
      <Close onClick={close}>
        <IconClose />
      </Close>
    </Head>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  position: relative;
  border-radius: 0.75rem;
  background: #fff;
  max-height: 100vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    opacity: 0;
  }
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Close = styled.div`
  cursor: pointer;
  svg {
    width: 2.6875rem;
    height: 2.6875rem;
    stroke: rgba(217, 217, 217, 1);
    transition: stroke 0.3s;
  }
  &:hover {
    svg {
      stroke: ${$primaryColor};
    }
  }
`;
