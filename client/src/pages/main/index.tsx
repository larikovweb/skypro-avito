import { FC } from 'react';
import { HelmetHead } from '../../components/seo/HelmetHead';
import { Container, GeneralTitle } from '../../styled/components';
import { ArticleCardList } from '../../components/article/ArticleCardList';
import { articleAPI } from '../../redux/services/articleService';

const Main: FC = () => {
  const { data: articles, isLoading } = articleAPI.useGetArticlesQuery({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HelmetHead title="Заголовок Главной" descr="Описание Главной" />
      <Container>
        <GeneralTitle>Объявления</GeneralTitle>
        <ArticleCardList articles={articles} />
      </Container>
    </>
  );
};

export default Main;
