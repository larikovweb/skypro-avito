import { FC, useCallback } from 'react';
import styled from '@emotion/styled';
import { $primaryColor, $primaryHoverColor, $secondaryColor } from '../../styled/variables';
import { Button } from '../../components/form/Button';
import { ModalControl } from '../../components/modal/ModalControl';
import { ModalFeedback } from '../../components/modal/ModalFeedback';
import { IImage, IUser } from '../../interface';
import { userAPI } from '../../redux/services/userService';
import { articleAPI } from '../../redux/services/articleService';
import { Link, useNavigate } from 'react-router-dom';
import { MAIN_ROUTE, PROFILE_ROUTE, SELLER_PROFILE_ROUTE } from '../../utils/consts';
import { CheckImage } from '../../components/img/CheckImage';
import { useModal } from '../../hooks/useModal';
import { PhoneButton } from '../../components/form/PhoneButton';
import { formatDateMonthAge, formatDateMonth } from '../../helpers/date';

type Props = {
  id: number;
  title: string;
  price: number;
  description: string;
  created_on: string;
  user: IUser;
  images: IImage[];
};

export const ArticleInfo: FC<Props> = (props) => {
  const { title, price, created_on, user, id, description, images } = props;
  const navigate = useNavigate();
  const { open } = useModal('article');

  const { data: userActive } = userAPI.useGetActiveUserQuery({});
  const [deleteArticle, { status }] = articleAPI.useDeleteArticleMutation();

  const myArticle = userActive?.id === user.id;
  const modalProps = {
    editable: true,
    formData: { title, price, description, id, localImages: images },
  };

  const removeArticle = useCallback(async () => {
    await deleteArticle(id);
    navigate(MAIN_ROUTE);
  }, [id, deleteArticle, navigate]);

  return (
    <Wrapper>
      <Title>{title}</Title>
      <InfoList>
        <li>Опубликовано: {formatDateMonth(created_on)}</li>
        <li>{user.city}</li>
      </InfoList>
      <ModalControl id="feedback" modal={() => <ModalFeedback />}>
        <Feedback>23 отзыва</Feedback>
      </ModalControl>
      <Price>{price.toLocaleString('ru-RU')} ₽</Price>
      <Buttons>
        {myArticle ? (
          <>
            <Button onClick={() => open(modalProps)}>Редактировать</Button>
            <Button pending={status === 'pending'} onClick={removeArticle}>
              Снять с публикации
            </Button>
          </>
        ) : (
          <PhoneButton phone={user.phone} email={user.email} />
        )}
      </Buttons>
      <Seller to={myArticle ? PROFILE_ROUTE : `${SELLER_PROFILE_ROUTE}/${user.id}`}>
        <CheckImage type="avatar" size="2.5rem" src={user.avatar} />
        <Name>
          <b>{user.name}</b>
          <span>Продает товары с {formatDateMonthAge(user.sells_from)}</span>
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

const Buttons = styled.div`
  display: flex;
  margin-bottom: 2rem;
  button {
    &:not(:last-of-type) {
      margin-right: 0.75rem;
    }
  }
`;

const Seller = styled(Link)`
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
