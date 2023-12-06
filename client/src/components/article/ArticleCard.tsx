import styled from '@emotion/styled';
import { FC } from 'react';
import { $primaryColor, $primaryHoverColor, $secondaryColor } from '../../styled/variables';
import { Link } from 'react-router-dom';
import { ARTICLE_ROUTE } from '../../utils/consts';
import { GeneralImg } from '../../styled/components';

type Props = {
  id: string;
};

export const ArticleCard: FC<Props> = (props) => {
  const { id } = props;
  return (
    <Wrapper to={`${ARTICLE_ROUTE}/${id}`}>
      <Image>
        <GeneralImg
          src="https://alterainvest.ru/upload/iblock/f3e/f3e85c532e10881862a5e3c576599a14.jpg"
          alt=""
        />
      </Image>
      <Title>Ракетка для большого тенниса Triumph Pro ST...</Title>
      <Price>2 200 ₽</Price>
      <InfoList>
        <li>Санкт Петербург</li>
        <li>Сегодня в 10:45</li>
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

const Image = styled.div`
  position: relative;
  height: 16.875rem;
  background-color: #f0f0f0;
  margin-bottom: 1.25rem;
  overflow: hidden;
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
