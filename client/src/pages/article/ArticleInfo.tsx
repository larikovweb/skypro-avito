import { FC, useCallback } from 'react';
import styled from '@emotion/styled';
import { $primaryColor, $primaryHoverColor, $secondaryColor } from '../../styled/variables';
import { Button } from '../../components/form/Button';
import { ModalControl } from '../../components/modal/ModalControl';
import { ModalFeedback } from '../../components/modal/ModalFeedback';
import { IUser } from '../../interface';
import { userAPI } from '../../redux/services/userService';
import { articleAPI } from '../../redux/services/articleService';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../../utils/consts';
import { CheckImage } from '../../components/img/CheckImage';
import { useModal } from '../../hooks/useModal';

type Props = {
  id: number;
  title: string;
  price: number;
  description: string;
  created_on: string;
  user: IUser;
  myArticle?: boolean;
};

export const ArticleInfo: FC<Props> = (props) => {
  const { title, price, created_on, user, id, description } = props;
  const navigate = useNavigate();
  const { open } = useModal('article');

  const { data: userActive } = userAPI.useGetActiveUserQuery({});
  const [deleteArticle, { status }] = articleAPI.useDeleteArticleMutation();

  const myArtile = userActive?.id === user.id;
  const modalProps = {
    editable: true,
    formData: { title: title, price: price, description: description, id: id },
  };

  const removeArticle = useCallback(async () => {
    await deleteArticle(id);
    navigate(MAIN_ROUTE);
  }, [id, deleteArticle, navigate]);

  return (
    <Wrapper>
      <Title>{title}</Title>
      <InfoList>
        <li>{created_on}</li>
        <li>{user.city}</li>
      </InfoList>
      <ModalControl id="feedback" modal={() => <ModalFeedback />}>
        <Feedback>23 отзыва</Feedback>
      </ModalControl>
      <Price>{price} ₽</Price>
      <Buttons>
        {myArtile ? (
          <>
            <Button onClick={() => open(modalProps)}>Редактировать</Button>
            <Button pending={status === 'pending'} onClick={removeArticle}>
              Снять с публикации
            </Button>
          </>
        ) : (
          <MyButton>
            <b>Показать телефон</b>
            <span>{user.phone}</span>
          </MyButton>
        )}
      </Buttons>
      <Seller>
        <CheckImage type="avatar" size="2.5rem" src={user.avatar} />
        <Name>
          <b>{user.name}</b>
          <span>{user.sells_from}</span>
        </Name>
      </Seller>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-family: 'NotoSans', sans-serif;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
`;

const InfoList = styled.ul`
  color: ${$secondaryColor};
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  margin-top: 0.5rem;
  > * {
    margin-bottom: 0.25rem;
  }
`;

const Feedback = styled.div`
  width: fit-content;
  cursor: pointer;
  color: ${$primaryColor};
  font-family: 'NotoSans', sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  transition: color 0.3s;
  &:hover {
    color: ${$primaryHoverColor};
  }
`;

const Price = styled.div`
  font-family: 'NotoSans', sans-serif;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  margin: 2rem 0 1.25rem;
`;

const MyButton = styled(Button)`
  span {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  b {
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  }
  span {
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;

const Buttons = styled.div`
  display: flex;
  margin-bottom: 2rem;
  button {
    &:not(:last-of-type) {
      margin-right: 0.75rem;
    }
  }
`;

const Seller = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'NotoSans', sans-serif;
  margin-left: 0.5rem;
  b {
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;
  }
  span {
    color: ${$secondaryColor};
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 200%;
  }
`;
