import { FC, useState } from 'react';
import { Button } from './Button';
import styled from '@emotion/styled';
import { isString } from '@bunt/is';

type Props = {
  phone: string | undefined;
  email: string;
};

export const PhoneButton: FC<Props> = (props) => {
  const { phone, email } = props;
  console.log(phone, email);

  const [showEmail, setShowEmail] = useState(`${email.slice(0, 4)}ХХХХХХХ`);
  const [showPhone, setShowPhone] = useState(
    isString(phone) ? `${phone.slice(0, 4)}ХХХ ХХ ХХ` : '',
  );
  const handleClick = () => {
    setShowEmail(email);
    setShowPhone(isString(phone) ? phone : '');
  };

  return (
    <Wrapper onClick={handleClick}>
      {isString(phone) ? (
        <>
          <b>Показать телефон</b>
          <span>{showPhone}</span>
        </>
      ) : (
        <>
          <b>Показать email</b>
          <span>{showEmail}</span>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Button)`
  span {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  b {
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  }
  span {
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;
