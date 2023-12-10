import { css, Global } from '@emotion/react';
import { FC } from 'react';
import { calcFluidFontSize, fontFace } from './mixins';
import { RobotoBold, RobotoMedium, RobotoRegular } from '../assets/fonts/Roboto';
import emotionReset from 'emotion-reset';
import {
  $desktopWidth,
  $mainBackgroundColor,
  $mainFont,
  $mainFontColor,
  $mainFontSize,
  $phoneWidth,
} from './variables';
import { SCREEN_LG, SCREEN_SM } from '../utils/consts';

export const GlobalStyles: FC = () => (
  <Global
    styles={css`
      ${emotionReset}
      ${fontFace('Roboto', RobotoRegular, 400)}
      ${fontFace('Roboto', RobotoMedium, 500)}
      ${fontFace('Roboto', RobotoBold, 700)}

      html {
        font-family: ${$mainFont};
        font-size: ${$mainFontSize};
        scroll-behavior: smooth;
        font-size: 16px;
        @media screen and (max-width: ${$desktopWidth}) {
          font-size: ${calcFluidFontSize(5.333, 16, SCREEN_SM, SCREEN_LG)};
        }
        @media screen and (max-width: ${$phoneWidth}) {
          font-size: ${calcFluidFontSize(14, 24, 280, SCREEN_SM)};
        }
      }

      * {
        box-sizing: border-box;
      }

      body {
        position: relative;
        background: ${$mainBackgroundColor};
        color: ${$mainFontColor};
      }

      #root {
        display: grid;
        grid-template-rows: auto 1fr auto;
        min-height: 100vh;
      }

      a {
        color: inherit;
        text-decoration: none;
        cursor: pointer;
      }

      button {
        cursor: pointer;
        border: none;
        background: none;
      }
    `}
  />
);
