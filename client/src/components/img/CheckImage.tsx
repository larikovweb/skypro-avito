import { FC } from 'react';
import { GeneralImg, GeneralPlug } from '../../styled/components';
import { SERVER_URL } from '../../utils/consts';
import styled from '@emotion/styled';
import { isNull } from '@bunt/is';
import { plugsDict } from '../../helpers/dict';

type Props = {
  size?: string;
  src: string | null;
  type?: 'avatar' | 'image';
  children?: React.ReactNode;
};
export const CheckImage: FC<Props> = (props) => {
  const { src, size, type = 'image', children } = props;

  return (
    <Wrapper $size={size}>
      {!isNull(src) ? (
        <GeneralImg src={`${SERVER_URL}/${src}`} alt="Аватар" />
      ) : (
        <GeneralPlug>{plugsDict[type]}</GeneralPlug>
      )}
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $size?: string }>`
  position: relative;
  width: ${(props) => props.$size ?? '100%'};
  height: ${(props) => props.$size ?? '100%'};
  background-color: #f0f0f0;
  overflow: hidden;
`;
