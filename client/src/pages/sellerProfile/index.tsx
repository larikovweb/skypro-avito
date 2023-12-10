import { FC } from 'react';
import { Container, GeneralSubtitle, GeneralTitle } from '../../styled/components';
import styled from '@emotion/styled';
import { HelmetHead } from '../../components/seo/HelmetHead';
import { ProfileView } from './ProfileView';
import { ArticleCardList } from '../../components/article/ArticleCardList';
import { articleAPI } from '../../redux/services/articleService';
import { userAPI } from '../../redux/services/userService';
import { isUndefined } from '@bunt/is';
import { useParams } from 'react-router-dom';
import { IUser } from '../../interface';

const SellerProfile: FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: articles,
    isLoading,
    isError,
  } = articleAPI.useGetArticlesQuery({ sorting: 'new', user_id: id });

  const { data: users, isLoading: userLoading, isError: userError } = userAPI.useGetUsersQuery({});

  const loading = userLoading && <div>Loading...</div>;
  const error = userError && <div>Error</div>;
  const content = !isUndefined(users) && (
    <>
      <GeneralTitle>Профиль продавца</GeneralTitle>
      <ProfileView user={users.find((user) => user.id === Number(id)) as IUser} />
      <SubTitle>Товары продавца</SubTitle>
      <ArticleCardList articles={articles} isError={isError} isLoading={isLoading} />
    </>
  );

  return (
    <>
      <HelmetHead title="Настройки профиля" descr="Настройки профиля" />
      <Container>
        {loading}
        {error}
        {content}
      </Container>
    </>
  );
};

const SubTitle = styled(GeneralSubtitle)`
  margin-bottom: 1.25rem;
`;

export default SellerProfile;
