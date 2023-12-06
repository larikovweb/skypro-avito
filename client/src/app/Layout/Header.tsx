import styled from '@emotion/styled';
import { FC } from 'react';
import { Container } from '../../styled/components';
import { Link } from 'react-router-dom';
import { $primaryColor } from '../../styled/variables';
import { Button } from '../../components/form/Button';
import { PROFILE_ROUTE } from '../../utils/consts';
import { ModalControl } from '../../components/modal/ModalControl';
import { ModalAuth } from '../../components/modal/ModalAuth';
import { ModalArticle } from '../../components/modal/ModalArticle';

export const Header: FC = () => {
  const isAuth = true;

  return (
    <Wrapper>
      <MyContainer>
        {isAuth ? (
          <>
            <ModalControl id="article" modal={<ModalArticle />}>
              <Button whiteBorder>Разместить объявление</Button>
            </ModalControl>
            <Link to={PROFILE_ROUTE}>
              <Button whiteBorder>Личный кабинет</Button>
            </Link>
          </>
        ) : (
          <ModalControl id="auth" modal={<ModalAuth />}>
            <Button whiteBorder>Вход в личный кабинет</Button>
          </ModalControl>
        )}
      </MyContainer>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background-color: ${$primaryColor};
  padding: 1.25rem 0;
`;

const MyContainer = styled(Container)`
  display: flex;
  justify-content: flex-end;
  > *:not(:last-child) {
    margin-right: 0.5rem;
  }
`;
