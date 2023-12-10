import { FC } from 'react';
import { HelmetHead } from '../../components/seo/HelmetHead';
import { Container, GeneralTitle } from '../../styled/components';
import { ArticleCardList } from '../../components/article/ArticleCardList';
import { articleAPI } from '../../redux/services/articleService';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Main: FC = () => {
  const {
    data: articles,
    isLoading,
    isError,
  } = articleAPI.useGetArticlesQuery({
    sorting: 'new',
  });

  const searchQuery = useSelector((state: RootState) => state.article.searchQuery);

  const filteredArticles = articles?.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <HelmetHead title="Заголовок Главной" descr="Описание Главной" />
      <Container>
        <GeneralTitle>Объявления</GeneralTitle>
        <ArticleCardList articles={filteredArticles} isError={isError} isLoading={isLoading} />
      </Container>
    </>
  );
};

export default Main;
