//global styled

import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  max-width: 72.375rem;
  margin: 0 auto;
  padding: 0 1.25rem;
`;

export const GeneralTitle = styled.h1`
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 220%;
`;

export const GeneralSubtitle = styled.h2`
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 220%;
`;

export const GeneralImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const GeneralScroll = styled.div`
  position: relative;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-color: rgba(25, 25, 28, 0.2) rgba(25, 25, 28, 0.15); /* «цвет ползунка» «цвет полосы скроллбара» */
  scrollbar-width: thin;
  padding-right: 0.75rem;
  &::-webkit-scrollbar {
    width: 0.25rem;
    height: 0;
    background-color: rgba(25, 25, 28, 0.15);
    border-radius: 0.25rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(25, 25, 28, 0.2);
    border-radius: 0.25rem;
    transition: background-color 0.3s;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(25, 25, 28, 0.3);
  }

  /* Стрелки */
  &::-webkit-scrollbar-button:vertical:start:decrement {
    background: transparent;
    display: none;
  }

  &::-webkit-scrollbar-button:vertical:end:increment {
    background: transparent;
    display: none;
  }

  &::-webkit-scrollbar-button:horizontal:start:decrement {
    background: transparent;
    display: none;
  }

  &::-webkit-scrollbar-button:horizontal:end:increment {
    background: transparent;
    display: none;
  }
`;

export const GeneralPlug = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  svg {
    width: 70%;
    height: 70%;
    fill: #000;
    stroke: #000;
    opacity: 0.3;
  }
`;
