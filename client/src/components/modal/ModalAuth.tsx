import { FC, useState } from 'react';
import { IconFullLogo } from '../../icons';
import { Input } from '../form/Input';
import { InputField } from '../form/InputField';
import { Button } from '../form/Button';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { authAPI } from '../../redux/services/authService';
import { setCredentials } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

type TForm = {
  email: string;
  password: string;
  repeatPassword?: string;
  name?: string;
  surname?: string;
  city?: string;
};

export const ModalAuth: FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const dispatch = useDispatch();
  const [registerUser, { status: registerStatus }] = authAPI.useRegisterMutation();
  const [loginUser, { status: loginStatus }] = authAPI.useLoginMutation();

  const isLoading = registerStatus === 'pending' || loginStatus === 'pending';

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<TForm>();

  const onSubmit = async (data: TForm) => {
    if (isRegister) {
      try {
        await registerUser(data).unwrap();
        setIsRegister(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const result = await loginUser(data).unwrap();
        const { access_token, refresh_token } = result;
        dispatch(
          setCredentials({
            accessToken: access_token,
            refreshToken: refresh_token,
          }),
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Wrapper>
      <Logo>
        <IconFullLogo />
      </Logo>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputField borderBottom error={errors.email?.message}>
          <Input
            {...register('email', {
              required: 'Почта не может быть пустой',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Некорректный адрес электронной почты',
              },
            })}
            placeholder="Email"
            bottomType
            type="email"
          />
        </InputField>
        <InputField borderBottom error={errors.password?.message}>
          <Input
            {...register('password', {
              required: 'Пароль не может быть пустым',
              minLength: {
                value: 6,
                message: 'Минимальная длина пароля 6 символов',
              },
              maxLength: {
                value: 20,
                message: 'Максимальная длина пароля 20 символов',
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
                message: 'Пароль должен содержать латинские буквы и цифры',
              },
            })}
            placeholder="Пароль"
            bottomType
            type="password"
          />
        </InputField>
        {isRegister && (
          <>
            <InputField borderBottom error={errors.repeatPassword?.message}>
              <Input
                {...register('repeatPassword', {
                  validate: (value) => value === getValues('password') || 'Пароли не совпадают',
                  required: 'Повторите пароль',
                })}
                placeholder="Повторите пароль"
                bottomType
                type="password"
              />
            </InputField>
            <InputField error={errors.name?.message} borderBottom>
              <Input
                {...register('name', {
                  minLength: {
                    value: 3,
                    message: 'Минимальная длина имени 3 символа',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Максимальная длина имени 20 символов',
                  },
                })}
                placeholder="Имя (необязательно)"
                bottomType
                type="text"
              />
            </InputField>
            <InputField error={errors.surname?.message} borderBottom>
              <Input
                {...register('surname', {
                  minLength: {
                    value: 3,
                    message: 'Минимальная длина фамилии 3 символа',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Максимальная длина фамилии 20 символов',
                  },
                })}
                placeholder="Фамилия (необязательно)"
                bottomType
                type="text"
              />
            </InputField>
            <InputField error={errors.city?.message} borderBottom>
              <Input
                {...register('city', {
                  required: false,
                  minLength: {
                    value: 3,
                    message: 'Минимальная длина города 3 символа',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Максимальная длина города 20 символов',
                  },
                })}
                placeholder="Город (необязательно)"
                bottomType
                type="text"
              />
            </InputField>
          </>
        )}
        <Button pending={isLoading} type="submit" fitContent={false}>
          {isRegister ? 'Зарегистрироваться' : 'Войти'}
        </Button>
      </Form>
      <Button onClick={() => setIsRegister((state) => !state)} secondary fitContent={false}>
        {isRegister ? 'Войти' : 'Зарегистрироваться'}
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 22.875rem;
  padding: 2.7rem 2.75rem 3rem;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.75rem;
  svg {
    width: 8.75006rem;
    height: 1.3125rem;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
  margin-bottom: 1.25rem;
  button {
    margin-top: 1.5rem;
  }
`;
