import styled, {css} from 'styled-components/native';
import {
  deviceType,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../../utils/deviceOrientationHook.tsx';
import {FontTypes, StrictTypoProps} from './typography';
import {TextFontScale} from '../../../theme/themeTypes.tsx';

interface handleFontSizeProps {
  type: FontTypes;
  size: {
    handset: TextFontScale;
    tablet: TextFontScale;
  };
}

const handleSizeOfText = ({type, size}: handleFontSizeProps) => {
  return (
    {
      h1: wp(size[deviceType][9]),
      h2: wp(size[deviceType][8]),
      h3: wp(size[deviceType][7]),
      h4: wp(size[deviceType][6]),
      h5: wp(size[deviceType][5]),
      body1: wp(size[deviceType][4]),
      body2: wp(size[deviceType][4]),
      subtitle1: wp(size[deviceType][3]),
      subtitle2: wp(size[deviceType][3]),
      caption: wp(size[deviceType][2]),
      overline: wp(size[deviceType][1]),
    }[type] || wp(size[deviceType][4])
  );
};

export const TextStyled = styled.Text<StrictTypoProps>`
  ${({
    fontWeight = 'regular',
    type = 'body1',
    color,
    fontStyle = 'normal',
    showUnderline = false,
    paddingHorizontal = 0,
    paddingVertical = 0,
    removeBottomSpace,
    lineHeight,
    letterSpacing,
    align,
    theme: {
      space,
      common,
      font: {family, size, weight},
    },
  }) => css`
    color: ${color || common.white};
    font-family: ${family[0]};
    font-size: ${handleSizeOfText({type, size})}px;
    font-weight: ${weight[fontWeight]};
    font-style: ${fontStyle};
    text-align: ${align};
    ${lineHeight !== undefined && `line-height: ${hp(lineHeight)}px`};
    ${showUnderline && 'text-decoration-line: underline'};
    padding-horizontal: ${wp(paddingHorizontal)}px;
    padding-vertical: ${hp(paddingVertical)}px;
    margin-bottom: ${showUnderline || removeBottomSpace ? 0 : hp(space.sm)}px;
    ${letterSpacing && `letter-spacing: ${letterSpacing}px`};
  `}
`;
