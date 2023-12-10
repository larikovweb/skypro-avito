import styled from '@emotion/styled';
import { FC } from 'react';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';
import { HelmetHead } from '../../components/seo/HelmetHead';
import { Navigate } from './Navigate';
import { $phoneWidth } from '../../styled/variables';

export const Layout: FC = () => {
  return (
    <>
      <HelmetHead title="Общий заголовок" descr="Общее описание" />
      <Header />
      <Main>
        <Navigate />
        <Outlet />
      </Main>
    </>
  );
};

const Main = styled.main`
  display: block;
  padding-bottom: 2rem;
  @media screen and (max-width: ${$phoneWidth}) {
    padding-bottom: 5rem;
    padding-top: 5rem;
  }
`;
