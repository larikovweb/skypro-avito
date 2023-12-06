import { FC } from 'react';
import { GeneralSubtitle } from '../../styled/components';
import { UploadAvatar } from '../../components/form/UploadAvatar';
import { InputField } from '../../components/form/InputField';
import { Input } from '../../components/form/Input';
import styled from '@emotion/styled';
import { Button } from '../../components/form/Button';
import { useForm } from 'react-hook-form';

type TForm = {
  name?: string;
  surname?: string;
  city?: string;
  phone: string;
  email: string;
};

export const ProfileSettings: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>();

  const onSubmit = (data: TForm) => {
    console.log(data);
  };

  return (
    <>
      <Title>Настройки профиля</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <UploadAvatar />
        <Inputs>
          <Row>
            <InputField label="Имя" error={errors.name?.message}>
              <Input {...register('name')} placeholder="Введите имя" />
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
          <Button type="submit">Сохранить</Button>
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
