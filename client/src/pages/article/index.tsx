import { FC } from 'react';
import { ArticleGallery } from './ArticleGallery';
import { ArticleInfo } from './ArticleInfo';
import styled from '@emotion/styled';
import { Container } from '../../styled/components';
import { ArticleDescr } from './ArticleDescr';
import { useParams } from 'react-router-dom';
import { articleAPI } from '../../redux/services/articleService';
import { isUndefined } from '@bunt/is';

const Article: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: article, isLoading, isError } = articleAPI.useGetArticleQuery(Number(id));
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || isUndefined(article)) {
    return <div>Error</div>;
  }

  const { images, description, title, created_on, user, price } = article;

  return (
    <Container>
      <Wrapper>
        <ArticleGallery images={images} />
        <ArticleInfo
          description={description}
          id={Number(id)}
          title={title}
          created_on={created_on}
          user={user}
          price={price}
          images={images}
        />
      </Wrapper>
      {!isUndefined(description) && <ArticleDescr description={description} />}
    </Container>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 3.7rem;
  padding-top: 2.25rem;
  margin-bottom: 3.75rem;
`;

export default Article;
