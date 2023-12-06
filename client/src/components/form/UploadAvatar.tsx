import styled from '@emotion/styled';
import { FC, useState } from 'react';
import { $primaryColor, $primaryHoverColor } from '../../styled/variables';
import { GeneralImg } from '../../styled/components';

export const UploadAvatar: FC = () => {
  const [avatar, setAvatar] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setAvatar(URL.createObjectURL(file));
      // Here you can also handle the upload logic or pass the file to a parent component via props
    }
  };

  return (
    <Wrapper>
      <Avatar>
        {avatar.length > 0 && <GeneralImg src={avatar} alt="Аватар" />}
        <FileInput id="avatar-upload" type="file" accept="image/*" onChange={handleFileChange} />
      </Avatar>
      <Btn htmlFor="avatar-upload">Заменить</Btn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
`;

const Avatar = styled.div`
  width: 10.625rem;
  height: 10.625rem;
  border-radius: 100%;
  background-color: #f0f0f0;
  overflow: hidden;
  position: relative;
  margin-bottom: 0.5rem;
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
  transition: color 0.3s;
  &:hover {
    color: ${$primaryHoverColor};
  }
`;
