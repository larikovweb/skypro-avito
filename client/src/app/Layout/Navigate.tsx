import { FC, useEffect, useState } from 'react';
import { IconLogo } from '../../icons';
import { Link, useLocation } from 'react-router-dom';
import { MAIN_ROUTE } from '../../utils/consts';
import { Input } from '../../components/form/Input';
import { Button } from '../../components/form/Button';
import styled from '@emotion/styled';
import { Container } from '../../styled/components';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../redux/slices/articleSlice';
import { $phoneWidth, $primaryColor } from '../../styled/variables';

export const Navigate: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isMainPage = pathname === MAIN_ROUTE;

  const handleSearch = () => {
    console.log(inputValue);

    dispatch(setSearchQuery(inputValue));
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      console.log(inputValue);
      dispatch(setSearchQuery(inputValue));
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, dispatch]);

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
  @media screen and (max-width: ${$phoneWidth}) {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 2.5rem;
    height: 2.5rem;
    background-color: #fff;
    border-radius: 100%;
    margin-right: 0.5rem;
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

const Wrapper = styled(Container)`
  display: flex;
  align-items: center;
  padding: 2.6875rem 1.25rem;
  input {
    margin-right: 0.5rem;
  }
  @media screen and (max-width: ${$phoneWidth}) {
    padding: 0.7rem 1rem;
    background-color: ${$primaryColor};
    position: fixed;
    z-index: 11;
    top: 0;
    left: 0;
    width: 100%;
    button {
      display: none;
    }
    input {
      margin-right: 0;
    }
  }
`;
