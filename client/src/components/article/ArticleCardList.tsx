import { FC } from 'react';
import { ArticleCard } from './ArticleCard';
import styled from '@emotion/styled';
import { IArticle } from '../../interface';

type Props = {
  articles: IArticle[];
};

export const ArticleCardList: FC<Props> = (props) => {
  const { articles } = props;
  return (
    <Wrapper>
      {articles.map((article, index) => (
        <ArticleCard article={article} key={index} />
      ))}
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem 1.5rem;
`;
