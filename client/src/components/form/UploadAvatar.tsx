import styled from '@emotion/styled';
import { forwardRef } from 'react';
import { $primaryColor, $primaryHoverColor } from '../../styled/variables';
import { CheckImage } from '../img/CheckImage';

type Props = {
  getFile: (file: File | null) => void;
  avatar: string | null;
};

export const UploadAvatar = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { getFile, avatar, ...rest } = props;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      getFile(file);
      return;
    }
  };

  return (
    <Wrapper>
      <CheckImage type="avatar" src={avatar ? avatar : null} size="10.625rem">
        <FileInput
          ref={ref}
          {...rest}
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </CheckImage>
      <Btn htmlFor="avatar-upload">Заменить</Btn>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
`;

const FileInput = styled.input`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
`;

const Btn = styled.label`
  cursor: pointer;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: ${$primaryColor};
  margin-top: 0.5rem;
  transition: color 0.3s;
  &:hover {
    color: ${$primaryHoverColor};
  }
`;
