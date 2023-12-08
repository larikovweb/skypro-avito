import { FC } from 'react';
import { HelmetHead } from '../../components/seo/HelmetHead';
import { Container, GeneralTitle } from '../../styled/components';
import { ArticleCardList } from '../../components/article/ArticleCardList';
import { articleAPI } from '../../redux/services/articleService';

const Main: FC = () => {
  const {
    data: articles,
    isLoading,
    isError,
  } = articleAPI.useGetArticlesQuery({
    sorting: 'new',
  });

  return (
    <>
      <HelmetHead title="Заголовок Главной" descr="Описание Главной" />
      <Container>
        <GeneralTitle>Объявления</GeneralTitle>
        <ArticleCardList articles={articles} isError={isError} isLoading={isLoading} />
      </Container>
    </>
  );
};

export default Main;
