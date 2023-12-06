import { FC } from 'react';
import { IconLogo } from '../../icons';
import { Link, useLocation } from 'react-router-dom';
import { MAIN_ROUTE } from '../../utils/consts';
import { Input } from '../../components/form/Input';
import { Button } from '../../components/form/Button';
import styled from '@emotion/styled';
import { Container } from '../../styled/components';

export const Navigate: FC = () => {
  const { pathname } = useLocation();
  const isMainPage = pathname === MAIN_ROUTE;
  return (
    <Wrapper>
      <Logo to={MAIN_ROUTE}>
        <IconLogo />
      </Logo>
      {isMainPage ? (
        <>
          <Input placeholder="Поиск по объявлениям" />
          <Button>Найти</Button>
        </>
      ) : (
        <Link to={MAIN_ROUTE}>
        <Button>
          Вернуться на главную
        </Button>
        </Link>
        
      )}
    </Wrapper>
  );
};

const Logo = styled(Link)`
  margin-right: 3.25rem;
  svg {
    width: 3.375rem;
    height: 2.33556rem;
  }
`;

const Wrapper = styled(Container)`
  display: flex;
  align-items: center;
  padding: 2.6875rem 0;
  input {
    margin-right: 0.5rem;
  }
`;
