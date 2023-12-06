import { FC } from 'react';
import { HelmetHead } from '../../components/seo/HelmetHead';
import { Container, GeneralTitle } from '../../styled/components';
import { ArticleCardList } from '../../components/article/ArticleCardList';

const Main: FC = () => {
  return (
    <>
      <HelmetHead title="Заголовок Главной" descr="Описание Главной" />
      <Container>
        <GeneralTitle>Объявления</GeneralTitle>
        <ArticleCardList />
      </Container>
    </>
  );
};

export default Main;
