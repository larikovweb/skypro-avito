import styled from '@emotion/styled';
import { FC, useState } from 'react';
import { $primaryColor } from '../../styled/variables';
import { IImage } from '../../interface';
import { CheckImage } from '../../components/img/CheckImage';

type Props = {
  images: IImage[];
};

export const ArticleGallery: FC<Props> = (props) => {
  const { images } = props;
  const [active, setActive] = useState(0);

  return (
    <Wrapper>
      <CheckImage src={images[active] ? images[active].url : null} size="30rem" />
      <Thumbnails>
        {images.map((image, index) => (
          <Thumbnail $active={index === active} onClick={() => setActive(index)} key={image.id}>
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
  cursor: pointer;
  border: 0.125rem solid ${({ $active }) => ($active ? $primaryColor : 'transparent')};
`;
