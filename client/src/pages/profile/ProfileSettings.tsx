import { FC } from 'react';
import { GeneralSubtitle } from '../../styled/components';
import { UploadAvatar } from '../../components/form/UploadAvatar';
import { InputField } from '../../components/form/InputField';
import { Input } from '../../components/form/Input';
import styled from '@emotion/styled';
import { Button } from '../../components/form/Button';
import { useForm } from 'react-hook-form';
import { IUser } from '../../interface';
import { userAPI } from '../../redux/services/userService';

type Props = {
  user: IUser;
};

export const ProfileSettings: FC<Props> = (props) => {
  const { user } = props;
  const { name, surname, city, phone, email } = user;
  const [updateUser, { status }] = userAPI.useUpdateActiveUserMutation();
  const [uploadAvatar] = userAPI.useUploadAvatarUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IUser>({
    defaultValues: {
      name,
      surname,
      city,
      phone,
      email,
    },
  });

  const onSubmit = async (data: IUser) => {
    try {
      await updateUser(data).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Title>Настройки профиля</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <UploadAvatar avatar={user.avatar} getFile={(img) => uploadAvatar(img).unwrap()} />
        <Inputs>
          <Row>
            <InputField label="Имя" error={errors.name?.message}>
              <Input
                {...register('name', { required: 'Это поле обязательно' })}
                placeholder="Введите имя"
              />
            </InputField>
            <InputField label="Фамилия" error={errors.surname?.message}>
              <Input {...register('surname')} placeholder="Введите фамилию" />
            </InputField>
          </Row>
          <Row>
            <InputField label="Город" error={errors.city?.message}>
              <Input {...register('city')} placeholder="Введите город" />
            </InputField>
          </Row>
          <Row>
            <InputField label="Телефон" error={errors.phone?.message}>
              <Input
                {...register('phone', {
                  validate: (value) => {
                    if (
                      value &&
                      !/^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/i.test(
                        value,
                      )
                    ) {
                      return 'Некорректный номер';
                    }
                  },
                })}
                placeholder="Введите телефон"
              />
            </InputField>
            <InputField label="Электронная почта" error={errors.email?.message}>
              <Input
                {...register('email', {
                  required: 'Почта обязательна',
                  validate: (value) => {
                    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                      return 'Некорректная почта';
                    }
                  },
                })}
                type="email"
                placeholder="Электронная почта"
              />
            </InputField>
          </Row>
          <Button disabled={!isDirty} pending={status === 'pending'} type="submit">
            Сохранить
          </Button>
        </Inputs>
      </Form>
    </>
  );
};

const Title = styled(GeneralSubtitle)`
  margin-bottom: 1.25rem;
`;

const Form = styled.form`
  display: flex;
  margin-bottom: 4.25rem;
`;

const Inputs = styled.div`
  display: grid;
  gap: 1.25rem;
  margin-left: 3rem;
  max-width: 38.375rem;
  width: 100%;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;
