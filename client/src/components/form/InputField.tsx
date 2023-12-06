import styled from '@emotion/styled';
import { FC } from 'react';
import { $dangerColor } from '../../styled/variables';

type Props = {
  label?: string | React.ReactNode;
  children: React.ReactNode;
  error?: string;
  borderBottom?: boolean;
};

export const InputField: FC<Props> = ({ label, children, error, borderBottom }) => {
  return (
    <Wrap>
      {label && <Label>{label}</Label>}
      <Content $borderBottom={borderBottom} $error={Boolean(error)}>
        {children}
      </Content>
      {error && <Error>{error}</Error>}
    </Wrap>
  );
};

const Content = styled.div<{ $error: boolean; $borderBottom?: boolean }>`
  border: ${({ $error }) =>
    $error ? `0.0625rem solid ${$dangerColor}` : `0.0625rem solid transparent`};
  color: ${({ $error }) => ($error ? $dangerColor : 'inherit')};
  border-radius: 0.375rem;
  > * {
    color: ${({ $error }) => ($error ? $dangerColor : 'inherit')};
    width: 100%;
    height: 100%;
  }
  ${({ $borderBottom }) => $borderBottom && `border-radius: 0;`}
  ${({ $borderBottom }) => $borderBottom && `border: none;`}
  ${({ $borderBottom, $error }) =>
    $borderBottom && !$error
      ? `border-bottom: 0.0625rem solid transparent;`
      : $error && `border-bottom: 0.0625rem solid ${$dangerColor}`};
`;

const Wrap = styled.div<{ $hidden?: boolean; $noMargin?: boolean }>`
  position: relative;
  display: ${({ $hidden }) => ($hidden ? 'none' : 'flex')};
  flex-direction: column;
  transition: padding 0.3s;
`;

const Label = styled.span`
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  margin-bottom: 0.25rem;
`;

const Error = styled.span`
  font-size: 0.6rem;
  min-height: 1rem;
  color: ${$dangerColor};
  width: 100%;
  top: 100%;
  position: absolute;
  left: 0;
  z-index: 1;
`;
