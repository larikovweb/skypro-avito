import styled from '@emotion/styled';
import { FC } from 'react';
import { GeneralImg } from '../../styled/components';
import { $primaryColor } from '../../styled/variables';

export const ArticleGallery: FC = () => {
  return (
    <Wrapper>
      <MainImg>
        <GeneralImg src="https://picsum.photos/200/300" alt="" />
      </MainImg>
      <Thumbnails>
        <Thumbnail $active>
          <GeneralImg src="https://picsum.photos/200/300" alt="" />
        </Thumbnail>
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
