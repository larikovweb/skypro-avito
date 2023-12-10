import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ElementType, InputHTMLAttributes, forwardRef } from 'react';
import { $phoneWidth } from '../../styled/variables';

type Props = {
  as?: ElementType;
  bottomType?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { bottomType, ...rest } = props;

  return <InputField ref={ref} $bottomType={bottomType} {...rest} />;
});

const InputField = styled.input<{ $bottomType?: boolean }>`
  box-sizing: border-box;
  width: 100%;
  border-radius: 0.375rem;
  border: 0.0625rem solid rgba(0, 0, 0, 0.2);
  padding: 0.7656rem 1.19rem;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  outline: none;
  resize: vertical;
  transition: border 0.3s;
  ${({ $bottomType }) =>
    $bottomType &&
    css`
      font-size: 1.125rem;
      line-height: 1.5rem;
      letter-spacing: -0.00313rem;
      border-radius: 0;
      padding: 0.5rem 0;
      border: none;
      border-bottom: 0.0625rem solid #d9d9d9;
      border-radius: 0 !important;
    `}
  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
    opacity: 1;
    transition: opacity 0.3s;
  }
  &:focus {
    border-color: rgba(0, 0, 0, 0.5);
    &::placeholder {
      opacity: 0;
    }
  }
  @media screen and (max-width: ${$phoneWidth}) {
    padding: 0.56rem 1rem;
    font-size: 0.875rem;
    background-color: #fff;
    border-radius: 1.875rem;
  }
`;
