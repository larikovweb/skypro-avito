import { FC } from 'react';
import { ModalHead } from './ModalOverlay';
import { useModal } from '../../hooks/useModal';
import { InputField } from '../form/InputField';
import { Input } from '../form/Input';
import { Button } from '../form/Button';
import styled from '@emotion/styled';
import { Controller, useForm } from 'react-hook-form';
import { UploadImage } from '../form/UploadImage';
import { articleAPI } from '../../redux/services/articleService';
import { isNull } from '@bunt/is';

type TForm = {
  title: string;
  description: string;
  price: number;
  images: File[] | null;
};

export const ModalArticle: FC = () => {
  const { close } = useModal('article');
  const [createArticle] = articleAPI.useCreateArticleMutation();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    defaultValues: {
      images: null,
    },
  });

  const onSubmit = async (data: TForm) => {
    const { title, description, price, images } = data;
    console.log(data);
    if (isNull(images)) {
      return;
    }
    const files = images.filter((image): image is File => image instanceof File);
    const fields = { title, description, price };
    try {
      await createArticle({ files, fields }).unwrap();
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <ModalHead close={close}>Новое объявление</ModalHead>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputField error={errors.title?.message} label="Название">
          <Input
            {...register('title', { required: 'Поле не может быть пустым' })}
            placeholder="Введите название"
          />
        </InputField>
        <InputField error={errors.description?.message} label="Описание">
          <Input
            {...register('description', { required: 'Поле не может быть пустым' })}
            placeholder="Введите описание"
            as={'textarea'}
          />
        </InputField>
        <InputField
          error={errors.images?.message}
          label={
            <Label>
              Фотографии товара <span>не более 5 фотографий</span>
            </Label>
          }>
          <Images>
            {[...Array(5)].map((_, index) => (
              <Controller
                key={index}
                control={control}
                name={`images.${index}`}
                render={({ field: { onChange } }) => (
                  <UploadImage
                    getFile={(file) => {
                      console.log(file);
                      onChange(file);
                    }}
                  />
                )}
              />
            ))}
          </Images>
        </InputField>
        <InputField error={errors.price?.message} label="Цена">
          <InputPrice>
            <Input
              {...register('price', { required: 'Поле не может быть пустым' })}
              placeholder="0"
            />
            <Currency>₽</Currency>
          </InputPrice>
        </InputField>
        <Button>Опубликовать</Button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 37.5rem;
  padding: 1.25rem 3rem 2.5rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1.25rem;
  margin-top: 0.65rem;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 0.5rem;
    color: rgba(0, 0, 0, 0.3);
  }
`;

const InputPrice = styled.div`
  position: relative;
  width: 12.5rem;
  input {
    padding-right: 2.5rem;
  }
`;

const Currency = styled.div`
  position: absolute;
  top: 50%;
  right: 1.12rem;
  transform: translateY(-50%);
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const Images = styled.div`
  display: grid;
  gap: 0.625rem;
  justify-content: space-between;
  grid-template-columns: repeat(5, 1fr);
`;
