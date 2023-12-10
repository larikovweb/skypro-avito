import { FC, useState } from 'react';
import { IconLogo } from '../../icons';
import { Link, useLocation } from 'react-router-dom';
import { MAIN_ROUTE } from '../../utils/consts';
import { Input } from '../../components/form/Input';
import { Button } from '../../components/form/Button';
import styled from '@emotion/styled';
import { Container } from '../../styled/components';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../redux/slices/articleSlice';

export const Navigate: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isMainPage = pathname === MAIN_ROUTE;

  const handleSearch = () => {
    console.log(inputValue);

    dispatch(setSearchQuery(inputValue));
  };

  return (
    <Wrapper>
      <Logo to={MAIN_ROUTE}>
        <IconLogo />
      </Logo>
      {isMainPage ? (
        <>
          <Input
            placeholder="Поиск по объявлениям"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch}>Найти</Button>
        </>
      ) : (
        <Link to={MAIN_ROUTE}>
          <Button>Вернуться на главную</Button>
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
  padding: 2.6875rem 1.25rem;
  input {
    margin-right: 0.5rem;
  }
`;
