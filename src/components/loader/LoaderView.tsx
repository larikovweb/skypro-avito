import styled from '@emotion/styled';
import * as React from 'react';
import { IconLoader } from '../../icons';
import { $primaryColor } from '../../styled/variables';

export const LoaderView: React.FC = () => {
  return (
    <Wrapper>
      <IconLoader />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18.75rem;
  height: 12.5rem;
  svg {
    width: 8.5rem;
    fill: ${$primaryColor};
    stroke: ${$primaryColor};
  }
`;
