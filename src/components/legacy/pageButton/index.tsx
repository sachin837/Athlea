import {Text} from 'react-native';
import {
  Container,
  GradientContainer,
  PageIcon,
  PageIconContainer,
  PageText,
} from './pageButton.style.tsx';
import {useTheme} from 'styled-components';
import React, {FunctionComponent} from 'react';

type PageButtonProps = {
  onPress: () => void;
  disabled?: boolean;
  children?: string;
  style?: any;
  size: number;
  color?: string;
  gradientColors?: string[];
  disable?: boolean;
  name?: string;
  iconSize?: number;
  textSize?: number;
  marginSize?: number;
};

export const PageButton: FunctionComponent<PageButtonProps> = ({
  onPress,
  disabled,
  children,
  style,
  size,
  color,
  gradientColors,
  disable,
  name,
  iconSize,
  textSize,
  marginSize,
}) => {
  const theme = useTheme();
  return (
    <Container
      onPress={onPress}
      disabled={disabled}
      style={style}
      size={size}
      marginSize={marginSize}>
      <GradientContainer size={size} gradientColors={gradientColors}>
        <PageIcon theme={theme} size={iconSize} disable={disable} name={name} />
      </GradientContainer>
    </Container>
  );
};

// You don't need to use 'export default' here, just export the component
export const RightPageButton: FunctionComponent<PageButtonProps> = ({
  onPress,
  disabled,
  children,
  style,
  size,
  color,
  gradientColors,
  disable,
  name,
  iconSize,
  textSize,
}) => {
  const theme = useTheme();
  return (
    <Container onPress={onPress} disabled={disabled} style={style} size={size}>
      <GradientContainer size={size} gradientColors={gradientColors}>
        <PageIcon theme={theme} size={iconSize} disable={disable} name={name} />
      </GradientContainer>
      <PageText color={color} size={textSize}>
        {children}
      </PageText>
    </Container>
  );
};

// You don't need to use 'export default' here, just export the component
export const LeftPageButton: FunctionComponent<PageButtonProps> = ({
  onPress,
  disabled,
  children,
  style,
  size,
  color,
  disable,
  name,
  iconSize,
  textSize,
}) => {
  const theme = useTheme();
  return (
    <Container onPress={onPress} disabled={disabled} style={style} size={size}>
      <PageText color={color} size={textSize}>
        {children}
      </PageText>
      <PageIconContainer size={size}>
        <PageIcon size={iconSize} disable={disable} name={name} />
      </PageIconContainer>
    </Container>
  );
};
