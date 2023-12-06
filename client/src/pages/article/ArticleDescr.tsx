import { FC } from 'react';
import { GeneralSubtitle } from '../../styled/components';
import styled from '@emotion/styled';

export const ArticleDescr: FC = () => {
  return (
    <>
      <GeneralSubtitle>Описание товара</GeneralSubtitle>
      <Descr>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Descr>
    </>
  );
};

const Descr = styled.p`
  margin-top: 1.25rem;
  max-width: 49.5rem;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
