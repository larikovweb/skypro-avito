import { FC } from 'react';
import { Container, GeneralSubtitle, GeneralTitle } from '../../styled/components';
import styled from '@emotion/styled';
import { HelmetHead } from '../../components/seo/HelmetHead';
import { ProfileSettings } from './ProfileSettings';
import { ArticleCardList } from '../../components/article/ArticleCardList';
import { articleAPI } from '../../redux/services/articleService';
import { userAPI } from '../../redux/services/userService';
import { isUndefined } from '@bunt/is';

const Profile: FC = () => {
  const {
    data: articles,
    isLoading,
    isError,
  } = articleAPI.useGetMyArticlesQuery({ sorting: 'new' });

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = userAPI.useGetActiveUserQuery({});

  const loading = userLoading && <div>Loading...</div>;
  const error = userError && <div>Error</div>;
  const content = !isUndefined(user) && (
    <>
      <GeneralTitle>Здравствуйте, {user.name}!</GeneralTitle>
      <ProfileSettings user={user} />
    </>
  );

  return (
    <>
      <HelmetHead title="Настройки профиля" descr="Настройки профиля" />
      <Container>
        {loading}
        {error}
        {content}
        <SubTitle>Мои товары</SubTitle>
        <ArticleCardList articles={articles} isError={isError} isLoading={isLoading} />
      </Container>
    </>
  );
};

const SubTitle = styled(GeneralSubtitle)`
  margin-bottom: 1.25rem;
`;

export default Profile;
