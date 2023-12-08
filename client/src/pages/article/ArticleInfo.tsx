import { FC } from 'react';
import { GeneralImg } from '../../styled/components';
import styled from '@emotion/styled';
import { $primaryColor, $primaryHoverColor, $secondaryColor } from '../../styled/variables';
import { Button } from '../../components/form/Button';
import { ModalControl } from '../../components/modal/ModalControl';
import { ModalFeedback } from '../../components/modal/ModalFeedback';
import { IUser } from '../../interface';

type Props = {
  title: string;
  price: number;
  created_on: string;
  user: IUser;
};

export const ArticleInfo: FC<Props> = (props) => {
  const { title, price, created_on, user } = props;
  return (
    <Wrapper>
      <Title>{title}</Title>
      <InfoList>
        <li>{created_on}</li>
        <li>{user.city}</li>
      </InfoList>
      <ModalControl id="feedback" modal={<ModalFeedback />}>
        <Feedback>23 отзыва</Feedback>
      </ModalControl>
      <Price>{price} ₽</Price>
      <MyButton>
        <b>Показать телефон</b>
        <span>{user.phone}</span>
      </MyButton>
      <Seller>
        <Avatar>
          <GeneralImg src={`http://localhost:8090/${user.avatar}`} alt="" />
        </Avatar>
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
  margin-bottom: 2rem;
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

const Seller = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Avatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  fill: #f0f0f0;
  border-radius: 100%;
  overflow: hidden;
  position: relative;
  margin-right: 0.75rem;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'NotoSans', sans-serif;
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
