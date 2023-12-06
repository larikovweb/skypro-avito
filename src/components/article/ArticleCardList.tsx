import { FC } from 'react';
import { ArticleCard } from './ArticleCard';
import styled from '@emotion/styled';

export const ArticleCardList: FC = () => {
  const articles = [...new Array(6)];
  return (
    <Wrapper>
      {articles.map((_, index) => (
        <ArticleCard key={index} id={index.toString()} />
      ))}
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem 1.5rem;
`;
