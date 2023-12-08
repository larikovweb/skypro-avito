import styled from '@emotion/styled';
import { FC } from 'react';
import { GeneralImg } from '../../styled/components';
import { $primaryColor } from '../../styled/variables';
import { IImage } from '../../interface';

type Props = {
  images: IImage[];
};

export const ArticleGallery: FC<Props> = (props) => {
  const { images } = props;
  console.log(images);

  return (
    <Wrapper>
      <MainImg>
        <GeneralImg src={`http://localhost:8090/${images[0].url}`} alt="" />
      </MainImg>
      <Thumbnails>
        {images.map((image, index) => (
          <Thumbnail $active={index === 0} key={image.id}>
            <GeneralImg src={`http://localhost:8090/${image.url}`} alt="" />
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

const ImgWrapper = styled.div`
  position: relative;
  object-fit: cover;
  object-position: center;
  overflow: hidden;
`;

const MainImg = styled(ImgWrapper)`
  width: 30rem;
  height: 30rem;
`;

const Thumbnails = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
`;

const Thumbnail = styled(ImgWrapper)<{ $active: boolean }>`
  height: 5.5rem;
  border: 0.125rem solid ${({ $active }) => ($active ? $primaryColor : 'transparent')};
`;
