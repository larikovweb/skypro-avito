import styled from '@emotion/styled';
import { FC } from 'react';
import { $primaryColor } from '../../styled/variables';
import { IImage } from '../../interface';
import { CheckImage } from '../../components/img/CheckImage';

type Props = {
  images: IImage[];
};

export const ArticleGallery: FC<Props> = (props) => {
  const { images } = props;

  return (
    <Wrapper>
      <CheckImage src={images[0] ? images[0].url : null} size="30rem" />
      <Thumbnails>
        {images.map((image, index) => (
          <Thumbnail $active={index === 0} key={image.id}>
            <CheckImage src={image.url} />
          </Thumbnail>
        ))}
      </Thumbnails>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const Thumbnails = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 5rem;
  gap: 0.5rem;
`;

const Thumbnail = styled.div<{ $active: boolean }>`
  border: 0.125rem solid ${({ $active }) => ($active ? $primaryColor : 'transparent')};
`;
