import * as React from 'react';
import { CSSTransition, TransitionStatus } from 'react-transition-group';

const staticDuration = 350;

const defaultStyle = {
  transition: `all ${staticDuration}ms ease-in-out`,
};

const fadeInStyles: Partial<Record<TransitionStatus, React.CSSProperties>> = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

interface Props {
  in: boolean;
  children: React.ReactNode | React.ReactNode[];
  duration?: number;
  fadeStyles?: Partial<Record<TransitionStatus, React.CSSProperties>>;
  zIndex?: number;
}

export const FadeTransition: React.FC<Props> = (props) => {
  const {
    in: active,
    children,
    duration = staticDuration,
    fadeStyles = fadeInStyles,
    zIndex = 10,
  } = props;
  const nodeRef = React.useRef(null);

  return (
    <CSSTransition nodeRef={nodeRef} in={active} timeout={duration} mountOnEnter unmountOnExit>
      {(state) => (
        <div
          ref={nodeRef}
          style={{
            ...defaultStyle,
            ...fadeStyles[state],
            position: 'relative',
            zIndex: zIndex,
          }}>
          {children}
        </div>
      )}
    </CSSTransition>
  );
};
