import styled from '@emotion/styled';
import { ButtonHTMLAttributes, ElementType, forwardRef } from 'react';
import { IconLoader } from '../../icons';
import { fadeIn } from '../../styled/animations';
import { css } from '@emotion/react';
import { $primaryColor, $primaryHoverColor } from '../../styled/variables';
import { Link } from 'react-router-dom';

type LinkProps = React.ComponentPropsWithoutRef<typeof Link>;

type Props = {
  as?: ElementType;
  children: React.ReactNode;
  pending?: boolean;
  fitContent?: boolean;
  secondary?: boolean;
  whiteBorder?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  Partial<LinkProps>;

export const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    children,
    pending,
    secondary,
    fitContent = true,
    whiteBorder,
    as: Component = 'button',
    ...rest
  } = props;
  return (
    <Wrapper
      {...rest}
      as={Component}
      ref={ref}
      $pending={pending}
      $whiteBorder={whiteBorder}
      $secondary={secondary}
      $fitContent={fitContent}>
      {pending && <IconLoader />}
      <span>{children}</span>
    </Wrapper>
  );
});

const Wrapper = styled.button<{
  $pending?: boolean;
  $fitContent?: boolean;
  $secondary?: boolean;
  $whiteBorder?: boolean;
}>`
  cursor: pointer;
  width: ${({ $fitContent }) => ($fitContent ? 'fit-content' : '100%')};
  padding: 0.8125rem 2.3125rem;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${$primaryColor};
  border-radius: 0.375rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${$primaryHoverColor};
  }
  &:disabled {
    background-color: #d9d9d9;
  }
  svg {
    width: 7.5rem;
    height: 1.875rem;
    animation: ${fadeIn} 0.3s;
  }
  span {
    opacity: ${({ $pending }) => ($pending ? 0 : 1)};
    transition: opacity 0.3s;
  }

  ${({ $whiteBorder }) =>
    $whiteBorder &&
    css`
      padding: 0.5rem 1.5rem;
      border: 0.0625rem solid #fff;
      background: transparent;
      &:hover {
        background-color: rgba(255, 255, 255, 0.15);
      }
    `}

  ${({ $secondary }) =>
    $secondary &&
    css`
      color: #000;
      background: transparent;
      border: 0.0625rem solid #d9d9d9;
      &:hover {
        background-color: rgba(237, 219, 219, 0.5);
      }
    `}
`;
