import React, {FunctionComponent} from 'react';
import {TextStyled} from './typography.style.tsx';
import {StrictTypoProps} from './typography';

const TextComp: FunctionComponent<StrictTypoProps> = ({
  fontWeight = 'regular',
  fontStyle = 'normal',
  type = 'body1',
  children,
  align = 'left',
  showUnderline,
  paddingHorizontal = 0,
  removeBottomSpace = false,
  color,
  lineHeight,
  letterSpacing,
}) => {
  return (
    <TextStyled
      fontWeight={fontWeight}
      type={type}
      align={align}
      fontStyle={fontStyle}
      lineHeight={lineHeight}
      removeBottomSpace={removeBottomSpace}
      paddingHorizontal={paddingHorizontal}
      allowFontScaling={false}
      showUnderline={showUnderline}
      color={color}
      letterSpacing={letterSpacing}>
      {children}
    </TextStyled>
  );
};

export default TextComp;
