import styled from '@emotion/styled';
import { FC } from 'react';
import { $primaryColor, $primaryHoverColor, $secondaryColor } from '../../styled/variables';
import { Link } from 'react-router-dom';
import { ARTICLE_ROUTE } from '../../utils/consts';
import { IArticle } from '../../interface';
import { CheckImage } from '../img/CheckImage';

type Props = {
  article: IArticle;
};

export const ArticleCard: FC<Props> = (props) => {
  const { article } = props;
  const { id, title, price, user, images, created_on } = article;

  return (
    <Wrapper to={`${ARTICLE_ROUTE}/${id}`}>
      <CheckImage src={images[0] ? images[0].url : null} size="16.875rem" />
      <Title>{title}</Title>
      <Price>{price} ₽</Price>
      <InfoList>
        <li>{user.city}</li>
        <li>{created_on.slice(0, 10)}</li>
      </InfoList>
    </Wrapper>
  );
};

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
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
`;

const Title = styled.strong`
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  color: ${$primaryColor};
  margin-bottom: 0.5rem;
  transition: color 0.3s;
`;

const Price = styled.div`
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  margin-bottom: 0.5rem;
`;

const InfoList = styled.ul`
  color: ${$secondaryColor};
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
`;
