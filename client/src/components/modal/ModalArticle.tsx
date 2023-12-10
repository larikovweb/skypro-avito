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
import { isNull, isUndefined } from '@bunt/is';
import { useNavigate } from 'react-router-dom';
import { ARTICLE_ROUTE } from '../../utils/consts';
import { IImage } from '../../interface';

type TForm = {
  title: string;
  description: string;
  price: number;
  images: File[] | null;
};

type TFormData = TForm & {
  id: number;
  localImages: IImage[];
};

type Props = {
  editable?: boolean;
  formData?: TFormData;
};

export const ModalArticle: FC<Props> = () => {
  const { close, props: modalProps }: { props: Props; close: () => void } = useModal('article');
  const [createArticle] = articleAPI.useCreateArticleMutation();
  const [updateArticle] = articleAPI.useUpdateArticleMutation();
  const [createNotImageArticle] = articleAPI.useCreateNotImageArticleMutation();
  const [updateImage] = articleAPI.useUpdateImageMutation();
  const [deleteImage] = articleAPI.useDeleteImageMutation();
  const { editable, formData } = modalProps;
  const navigate = useNavigate();
  const localImages: IImage[] = formData?.localImages || [];

  const defaultValues = editable ? formData : { images: null };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: TForm) => {
    const { title, description, price, images } = data;

    const fields = { title, description, price };
    try {
      if (editable && formData) {
        await updateArticle({ id: formData.id, fields }).unwrap();
      } else {
        if (isNull(images) || isNull(images[0])) {
          const result = await createNotImageArticle(fields).unwrap();
          navigate(`${ARTICLE_ROUTE}/${result.id}`);
        } else {
          const files = images.filter((image): image is File => image instanceof File);
          const result = await createArticle({ fields, files }).unwrap();
          navigate(`${ARTICLE_ROUTE}/${result.id}`);
        }
      }
      close();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadNewImage = async (file: File | null) => {
    if (formData && file) {
      try {
        await updateImage({ id: formData.id, file }).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeImage = async (id: number, file_url: string) => {
    try {
      await deleteImage({ id, file_url }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <ModalHead close={close}>
        {editable ? 'Редактирование объявления' : 'Новое объявление'}
      </ModalHead>
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
            {editable &&
              localImages.map((image, index) => (
                <UploadImage
                  key={index}
                  deleteFile={() => {
                    !isUndefined(formData) && removeImage(formData.id, image.url);
                  }}
                  src={image.url}
                  getFile={(file) => {
                    uploadNewImage(file);
                  }}
                />
              ))}
            {[...Array(5 - (localImages.length || 0))].map((_, index) => (
              <Controller
                key={index}
                control={control}
                name={`images.${index}`}
                render={({ field: { onChange } }) => (
                  <UploadImage
                    getFile={(file) => {
                      !editable && onChange(file);
                      editable && uploadNewImage(file);
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
