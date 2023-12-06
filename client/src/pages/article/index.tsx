import { FC } from 'react';
import { ArticleGallery } from './ArticleGallery';
import { ArticleInfo } from './ArticleInfo';
import styled from '@emotion/styled';
import { Container } from '../../styled/components';
import { ArticleDescr } from './ArticleDescr';

const Article: FC = () => {
  return (
    <Container>
      <Wrapper>
        <ArticleGallery />
        <ArticleInfo />
      </Wrapper>
      <ArticleDescr />
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
