import { FC } from 'react';
import styled from '@emotion/styled';
import { IUser } from '../../interface';
import { CheckImage } from '../../components/img/CheckImage';
import { $secondaryColor } from '../../styled/variables';
import { PhoneButton } from '../../components/form/PhoneButton';
import { formatDateMonthAge } from '../../helpers/date';

type Props = {
  user: IUser;
};

export const ProfileView: FC<Props> = (props) => {
  const { user } = props;
  const { name, surname, city, phone, avatar, email, sells_from } = user;

  return (
    <Wrapper>
      <CheckImage size="10.625rem" type="avatar" src={avatar} />
      <Info>
        <Name>
          {name} {surname}
        </Name>
        <InfoList>
          <li>{city}</li>
          <li>Продает товары с {formatDateMonthAge(sells_from)}</li>
        </InfoList>
        <PhoneButton phone={phone} email={email} />
      </Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2.75rem;
`;

const Info = styled.div`
  font-family: 'NotoSans', sans-serif;
  display: flex;
  flex-direction: column;
  margin-left: 3rem;
`;

const Name = styled.div`
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 200%;
`;

const InfoList = styled.ul`
  color: ${$secondaryColor};
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 200%;
  margin-bottom: 1.75rem;
`;
