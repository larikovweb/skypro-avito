import styled from '@emotion/styled';
import { FC } from 'react';
import { Container } from '../../styled/components';
import { Link } from 'react-router-dom';
import { $phoneWidth, $primaryColor } from '../../styled/variables';
import { Button } from '../../components/form/Button';
import { PROFILE_ROUTE } from '../../utils/consts';
import { ModalControl } from '../../components/modal/ModalControl';
import { ModalAuth } from '../../components/modal/ModalAuth';
import { ModalArticle } from '../../components/modal/ModalArticle';
import { useAuth } from '../../hooks/useAuth';
import { IconCreate, IconExit, IconProfile } from '../../icons';

export const Header: FC = () => {
  const { isAuth, logout } = useAuth();

  return (
    <Wrapper>
      <MyContainer>
        {isAuth ? (
          <>
            <ModalControl id="article" modal={() => <ModalArticle />}>
              <Button whiteBorder>
                <span>Разместить объявление</span> <IconCreate />{' '}
              </Button>
            </ModalControl>
            <Link to={PROFILE_ROUTE}>
              <Button whiteBorder>
                <span>Личный кабинет</span> <IconProfile />
              </Button>
            </Link>
            <div>
              <Button whiteBorder onClick={logout}>
                <span>Выйти</span> <IconExit />
              </Button>
            </div>
          </>
        ) : (
          <ModalControl id="auth" modal={() => <ModalAuth />}>
            <Button whiteBorder>
              <span>Вход в личный кабинет</span> <IconProfile />
            </Button>
          </ModalControl>
        )}
      </MyContainer>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100%;
  background-color: ${$primaryColor};
  padding: 0.35rem 0;
  @media screen and (max-width: ${$phoneWidth}) {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1);
    z-index: 11;
  }
`;

const MyContainer = styled(Container)`
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 0.5rem;
  }
  @media screen and (max-width: ${$phoneWidth}) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-content: space-between;
    justify-items: center;
    button {
      margin: 0;
    }
    > * {
      > button {
        padding: 0;
        margin: 0;
        > span {
          > span {
            display: none;
          }
          > svg {
            transform: none;
            position: static;
            width: 1.75rem;
            height: 1.75rem;
            stroke: ${$primaryColor};
            fill: ${$primaryColor};
          }
        }
      }
    }
  }
`;
