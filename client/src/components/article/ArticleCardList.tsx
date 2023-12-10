import { FC } from 'react';
import { ArticleCard } from './ArticleCard';
import styled from '@emotion/styled';
import { IArticle } from '../../interface';
import { isUndefined } from '@bunt/is';
import { $phoneWidth } from '../../styled/variables';

type Props = {
  articles: IArticle[] | undefined;
  isError: boolean;
  isLoading: boolean;
};

export const ArticleCardList: FC<Props> = (props) => {
  const { articles, isError, isLoading } = props;

  const loading = isLoading && <div>Loading...</div>;
  const error = isError && <div>Error</div>;
  const content =
    !isUndefined(articles) &&
    articles.map((article, index) => <ArticleCard article={article} key={index} />);

  return (
    <Wrapper>
      {loading}
      {error}
      {content}
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem 1.5rem;
  @media screen and (max-width: ${$phoneWidth}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
`;
