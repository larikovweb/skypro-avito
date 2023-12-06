import { FC } from 'react';
import { ModalHead } from './ModalOverlay';
import { useModal } from '../../hooks/useModal';
import { InputField } from '../form/InputField';
import { Input } from '../form/Input';
import { Button } from '../form/Button';
import { GeneralImg, GeneralScroll } from '../../styled/components';
import styled from '@emotion/styled';
import { $secondaryColor } from '../../styled/variables';
import { useForm } from 'react-hook-form';

type TForm = {
  feedback: string;
};

export const ModalFeedback: FC = () => {
  const { close } = useModal('feedback');
  const feedbacks = [...new Array(10)];
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<TForm>();

  const onSubmit = (data: TForm) => {
    console.log(data);
  };

  return (
    <Wrapper>
      <ModalHead close={close}>Отзывы о товаре</ModalHead>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputField error={errors.feedback?.message} label="Добавить отзыв">
          <Input
            {...register('feedback', { required: 'Поле не может быть пустым' })}
            as={'textarea'}
          />
        </InputField>
        <Button disabled={!isDirty}>Опубликовать</Button>
      </Form>
      <List>
        {feedbacks.map((_, index) => (
          <Item key={index}>
            <Avatar>
              <GeneralImg src="https://picsum.photos/200/300" alt="" />
            </Avatar>
            <Text>
              <Name>
                <b>Вася Пупкин</b>
                <span>14 августа</span>
              </Name>
              <Comment>
                <b>Комментарий</b>
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </span>
              </Comment>
            </Text>
          </Item>
        ))}
      </List>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 50rem;
  padding: 1.25rem 2.5rem 3.5rem 3.25rem;
`;

const Form = styled.form`
  display: grid;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const List = styled(GeneralScroll)`
  display: grid;
  gap: 1.75rem;
  max-height: 30rem;
`;

const Item = styled.li`
  display: flex;
`;

const Avatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  position: relative;
  margin-right: 0.75rem;
  overflow: hidden;
  border-radius: 100%;
`;

const Text = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const Name = styled.div`
  font-family: 'NotoSans', sans-serif;
  margin-bottom: 0.75rem;
  b {
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 200%;
    margin-right: 0.5rem;
  }
  span {
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 200%;
    color: ${$secondaryColor};
  }
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  b {
    font-family: 'NotoSans', sans-serif;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 200%;
  }
  span {
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  }
`;
