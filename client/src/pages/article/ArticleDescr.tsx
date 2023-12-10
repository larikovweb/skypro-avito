import { FC } from 'react';
import { GeneralSubtitle } from '../../styled/components';
import styled from '@emotion/styled';
import { $phoneWidth } from '../../styled/variables';

type Props = {
  description: string;
};

export const ArticleDescr: FC<Props> = (props) => {
  const { description } = props;

  return (
    <>
      <GeneralSubtitle>Описание товара</GeneralSubtitle>
      <Descr>{description}</Descr>
    </>
  );
};

const Descr = styled.p`
  margin-top: 1.25rem;
  max-width: 49.5rem;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  @media screen and (max-width: ${$phoneWidth}) {
    font-size: 0.875rem;
  }
`;
