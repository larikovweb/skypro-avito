import { FC } from 'react';
import { Container, GeneralSubtitle, GeneralTitle } from '../../styled/components';
import styled from '@emotion/styled';
import { HelmetHead } from '../../components/seo/HelmetHead';
import { ProfileSettings } from './ProfileSettings';
import { ArticleCardList } from '../../components/article/ArticleCardList';
import { articleAPI } from '../../redux/services/articleService';

const Profile: FC = () => {
  const { data: articles } = articleAPI.useGetArticlesQuery({});

  return (
    <>
      <HelmetHead title="Настройки профиля" descr="Настройки профиля" />
      <Container>
        <GeneralTitle>Здравствуйте, Антон!</GeneralTitle>
        <ProfileSettings />
        <SubTitle>Мои товары</SubTitle>
        <ArticleCardList articles={articles} />
      </Container>
    </>
  );
};

const SubTitle = styled(GeneralSubtitle)`
  margin-bottom: 1.25rem;
`;

export default Profile;
