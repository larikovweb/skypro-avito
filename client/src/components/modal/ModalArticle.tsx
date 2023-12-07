import { FC } from 'react';
import { ModalHead } from './ModalOverlay';
import { useModal } from '../../hooks/useModal';
import { InputField } from '../form/InputField';
import { Input } from '../form/Input';
import { Button } from '../form/Button';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { UploadImage } from '../form/UploadImage';
import { articleAPI } from '../../redux/services/articleService';

type TForm = {
  name: string;
  description: string;
  price: number;
  images: File[] | null[];
};

export const ModalArticle: FC = () => {
  const { close } = useModal('article');
  const [createArticle] = articleAPI.useCreateArticleMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TForm>({
    defaultValues: {
      images: [null, null, null],
    },
  });

  const onSubmit = async (data: TForm) => {
    console.log(data);
    try {
      await createArticle(data).unwrap();
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <ModalHead close={close}>Новое объявление</ModalHead>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputField error={errors.name?.message} label="Название">
          <Input
            {...register('name', { required: 'Поле не может быть пустым' })}
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
              <UploadImage
                {...register(`images.${index}`)}
                resetImage={() => setValue(`images.${index}`, null)}
                key={index}
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
