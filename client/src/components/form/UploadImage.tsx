import React, { forwardRef, useState } from 'react';
import { IconAdd, IconDelete } from '../../icons';
import styled from '@emotion/styled';
import { $dangerColor } from '../../styled/variables';

type Props = {
  resetImage: () => void;
};

export const UploadImage = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { resetImage, ...rest } = props;
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageSrc(null);
    resetImage();
  };

  return (
    <Wrapper>
      {imageSrc && (
        <Delete onClick={clearImage}>
          <IconDelete />
        </Delete>
      )}
      {imageSrc && <img src={imageSrc} alt="Uploaded" />}
      <input ref={ref} {...rest} type="file" accept="image/*" onChange={handleImageChange} />
      {!imageSrc && <IconAdd />}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5.625rem;
  height: 5.625rem;
  background-color: #f0f0f0;
  svg {
    width: 1.875rem;
    height: 1.875rem;
    stroke: rgba(217, 217, 217, 1);
  }
  input {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    z-index: 1;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const Delete = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  transform: translate(25%, -25%);
  width: 1.15rem;
  height: 1.15rem;
  background-color: rgba(255, 0, 0, 0.1);
  z-index: 5;
  border-radius: 0.15rem;
  svg {
    width: 1rem;
    height: 1rem;
    stroke: ${$dangerColor};
    fill: ${$dangerColor};
  }
`;
