import { FC } from 'react';
import { GeneralImg } from '../../styled/components';
import styled from '@emotion/styled';
import { $primaryColor, $primaryHoverColor, $secondaryColor } from '../../styled/variables';
import { Button } from '../../components/form/Button';

export const ArticleInfo: FC = () => {
  return (
    <Wrapper>
      <Title>Ракетка для большого тенниса Triumph Pro STС Б/У</Title>
      <InfoList>
        <li>Сегодня в 10:45</li>
        <li>Санкт-Петербург</li>
      </InfoList>
      <Feedback>23 отзыва</Feedback>
      <Price>2 200 ₽</Price>
      <MyButton>
        <b>Показать телефон</b>
        <span>8 905 ХХХ ХХ ХХ</span>
      </MyButton>
      <Seller>
        <Avatar>
          <GeneralImg src="https://picsum.photos/200/300" alt="" />
        </Avatar>
        <Name>
          <b>Кирилл</b>
          <span>Продает товары с августа 2021</span>
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
