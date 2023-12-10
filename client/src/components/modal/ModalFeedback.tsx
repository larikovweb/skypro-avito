import { FC } from 'react';
import { ModalHead } from './ModalOverlay';
import { useModal } from '../../hooks/useModal';
import { InputField } from '../form/InputField';
import { Input } from '../form/Input';
import { Button } from '../form/Button';
import { GeneralScroll } from '../../styled/components';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { articleAPI } from '../../redux/services/articleService';
import { isUndefined } from '@bunt/is';
import { formatDateMonthAge } from '../../helpers/date';
import { IComment } from '../../interface';
import { useAuth } from '../../hooks/useAuth';

type TForm = {
  feedback: string;
};

type Props = {
  id: number;
  feedbacks: IComment[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

export const ModalFeedback: FC<Props> = (props) => {
  const { id, feedbacks, isLoading, isError } = props;
  const { close } = useModal('feedback');
  const [createComment, { status }] = articleAPI.useCreateCommentMutation();
  const { isAuth } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<TForm>();

  const onSubmit = async (data: TForm) => {
    try {
      await createComment({ article_id: id, text: data.feedback }).unwrap();
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const loading = isLoading && <>Loading...</>;
  const error = isError && <>Error</>;
  const content = !isUndefined(feedbacks) && (
    <List>
      {feedbacks.map((feedback) => (
        <Comment>
          <b>Комментарий</b>
          <span>{feedback.text}</span>
          <i>{formatDateMonthAge(feedback.created_on)}</i>
        </Comment>
      ))}
    </List>
  );

  return (
    <Wrapper>
      <ModalHead close={close}>Отзывы о товаре</ModalHead>
      {isAuth && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputField error={errors.feedback?.message} label="Добавить отзыв">
            <Input
              {...register('feedback', { required: 'Поле не может быть пустым' })}
              as={'textarea'}
            />
          </InputField>
          <Button pending={status === 'pending'} disabled={!isDirty}>
            Опубликовать
          </Button>
        </Form>
      )}

      {loading}
      {error}
      {content}
    </Wrapper>
  );
};

// const CommentItem: FC<{ feedback: IComment }> = (props) => {
//   const { feedback } = props;

//   return (
//     <Item>
//       <CheckImage size="2.5rem" type="avatar" src={''} />
//       <Text>
//         <Name>
//           <span>{formatDateMonthAge(feedback.created_on)}</span>
//         </Name>
//         <Comment>
//           <b>Комментарий</b>
//           <span>{feedback.text}</span>
//         </Comment>
//       </Text>
//     </Item>
//   );
// };

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

// const Item = styled.li`
//   display: flex;
// `;

// const Text = styled.div`
//   display: grid;
//   gap: 0.75rem;
//   margin-left: 0.75rem;
// `;

// const Name = styled.div`
//   font-family: 'NotoSans', sans-serif;
//   margin-bottom: 0.75rem;
//   b {
//     font-size: 1rem;
//     font-style: normal;
//     font-weight: 600;
//     line-height: 200%;
//     margin-right: 0.5rem;
//   }
//   span {
//     font-size: 1rem;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 200%;
//     color: ${$secondaryColor};
//   }
// `;

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
