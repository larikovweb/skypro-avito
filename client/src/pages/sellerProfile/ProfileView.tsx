import { FC } from 'react';
import styled from '@emotion/styled';
import { IUser } from '../../interface';
import { CheckImage } from '../../components/img/CheckImage';
import { $phoneWidth, $secondaryColor } from '../../styled/variables';
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
  @media screen and (max-width: ${$phoneWidth}) {
    flex-direction: column;
    align-items: center;
    button {
      width: 100%;
    }
  }
`;

const Info = styled.div`
  font-family: 'NotoSans', sans-serif;
  display: flex;
  flex-direction: column;
  margin-left: 3rem;
  @media screen and (max-width: ${$phoneWidth}) {
    margin-left: 0;
    width: 100%;
  }
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
