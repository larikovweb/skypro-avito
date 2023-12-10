import styled from '@emotion/styled';
import { FC, useState } from 'react';
import { $phoneWidth, $primaryColor } from '../../styled/variables';
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
      <CheckImage src={images[active] ? images[active].url : null} />
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
  grid-template-columns: 30rem;
  grid-template-rows: 30rem auto;
  gap: 1.5rem;
  @media screen and (max-width: ${$phoneWidth}) {
    grid-template-rows: 20rem auto;
    grid-template-columns: 1fr;
    margin: 0 -1rem;
    gap: 0.25rem;
  }
`;

const Thumbnails = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 5rem;
  gap: 0.5rem;
  @media screen and (max-width: ${$phoneWidth}) {
    display: flex;
    overflow-x: auto;
    gap: 0.25rem;
    &::-webkit-scrollbar {
      display: none;
    }
    > * {
      min-width: 5rem;
      max-width: 5rem;
      height: 5rem;
    }
  }
`;

const Thumbnail = styled.div<{ $active: boolean }>`
  cursor: pointer;
  border: 0.125rem solid ${({ $active }) => ($active ? $primaryColor : 'transparent')};
`;
