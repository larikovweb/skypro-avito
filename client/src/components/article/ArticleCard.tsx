import styled from '@emotion/styled';
import { FC } from 'react';
import {
  $phoneWidth,
  $primaryColor,
  $primaryHoverColor,
  $secondaryColor,
} from '../../styled/variables';
import { Link } from 'react-router-dom';
import { ARTICLE_ROUTE } from '../../utils/consts';
import { IArticle } from '../../interface';
import { CheckImage } from '../img/CheckImage';
import { formatDateMonth } from '../../helpers/date';

type Props = {
  article: IArticle;
};

export const ArticleCard: FC<Props> = (props) => {
  const { article } = props;
  const { id, title, price, user, images, created_on } = article;

  return (
    <Wrapper to={`${ARTICLE_ROUTE}/${id}`}>
      <CheckImage src={images[0] ? images[0].url : null} />
      <Content>
        <Title>{title}</Title>
        <Price>{price.toLocaleString('ru-RU')} ₽</Price>
        <InfoList>
          <li>{user.city}</li>
          <li>{formatDateMonth(created_on)}</li>
        </InfoList>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled(Link)`
  display: grid;
  grid-template-rows: 16.344rem auto;
  gap: 0.5rem;
  width: 100%;
  img {
    transition: transform 0.3s;
  }

  &:hover {
    strong {
      color: ${$primaryHoverColor};
    }
    img {
      transform: scale(1.025);
    }
  }
  @media screen and (max-width: ${$phoneWidth}) {
    grid-template-rows: 8.25rem auto;
    gap: 0;
    border-radius: 0.45rem;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 0.25rem 0.85rem 0 rgba(0, 0, 0, 0.1);
  }
`;

const Content = styled.div`
  padding: 0.5rem;
`;

const Title = styled.strong`
  display: block;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  color: ${$primaryColor};
  margin-bottom: 0.5rem;
  transition: color 0.3s;
  @media screen and (max-width: ${$phoneWidth}) {
    font-size: 0.875rem;
  }
`;

const Price = styled.div`
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  margin-bottom: 0.5rem;
  @media screen and (max-width: ${$phoneWidth}) {
    font-size: 1rem;
  }
`;

const InfoList = styled.ul`
  color: ${$secondaryColor};
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  @media screen and (max-width: ${$phoneWidth}) {
    font-size: 0.75rem;
  }
`;
