import {View} from 'react-native';
import styled, {DefaultTheme} from 'styled-components/native';
import {deviceOrientationTypes} from '../../../contexts/types';
import {Text} from '../typography';
import {ButtonTypes} from './button';

interface ButtonProps {
  type?: ButtonTypes;
  disabledButton?: boolean;
  removeBottomSpace?: boolean;
  deviceOrientation?: deviceOrientationTypes;
  aspectRatio?: number;
  customWidthSize?: number;
}
export interface TextProps {
  buttonType?: ButtonTypes;
  disabledButton?: boolean;
  theme: DefaultTheme;
}

interface StyledButtonProps {
  bgColor?: string;
  marginBottom?: string;
}

interface ButtonTextProps {
  textColor?: string;
}

interface handleBackgroundColorProps {
  type: ButtonTypes;
  disable: boolean;
  colors: {
    primary: string;
    primaryDisable: string;
    facebook: string;
    google: string;
  };
}
interface handleBorderColorProps {
  type: ButtonTypes;
  disable: boolean;
  colors: {
    primary: string;
    primaryDisable: string;
    secondary: string;
    secondaryDisable: string;
    facebook: string;
    google: string;
  };
}
interface handleTextColorProps {
  type: ButtonTypes;
  disable: boolean;
  colors: {
    primary: string;
    primaryDisable: string;
    secondary: string;
    secondaryDisable: string;
    tertiary: string;
    tertiaryDisable: string;
  };
}
const handleBackgroundColor = ({
  type,
  disable,
  colors,
}: handleBackgroundColorProps) => {
  return (
    {
      primary: disable ? colors.primaryDisable : colors.primary,
      secondary: 'translate',
      third: 'translate',
      refresh: 'translate',
      facebook: colors.facebook,
      google: colors.google,
      apple: colors.google,
      edit: colors.primary,
      bluetooth: colors.primary,
    }[type] || colors.primary
  );
};
const handleBorderColor = ({type, disable, colors}: handleBorderColorProps) => {
  return (
    {
      primary: disable ? colors.primaryDisable : colors.primary,
      secondary: disable ? colors.secondaryDisable : colors.secondary,
      third: 'translate',
      refresh: 'translate',
      facebook: colors.facebook,
      google: colors.google,
      apple: colors.google,
      edit: colors.primary,
      bluetooth: colors.primary,
    }[type] || 'translate'
  );
};
const handleTextColor = ({type, disable, colors}: handleTextColorProps) => {
  return (
    {
      primary: disable ? colors.primaryDisable : colors.primary,
      secondary: disable ? colors.secondaryDisable : colors.secondary,
      third: disable ? colors.secondaryDisable : colors.secondary,
      refresh: disable ? colors.tertiaryDisable : colors.tertiary,
      facebook: colors.secondary,
      google: colors.primary,
      apple: colors.primary,
      edit: colors.primary,
      bluetooth: colors.primary,
    }[type] || colors.primary
  );
};

export const StyledButton = styled.TouchableOpacity<StyledButtonProps>`
  flex-direction: row;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.bgColor || '#000'};
  margin-bottom: ${props => props.marginBottom || '10px'};
  border-radius: 5px;
  border: 1px solid #000;
`;

export const ButtonText = styled.Text<ButtonTextProps>`
  color: ${props => props.textColor || '#fff'};
  font-size: 18px;
  text-align: left;
`;

export const StyledText = styled(Text).attrs<TextProps>(
  ({
    disabledButton = false,
    buttonType = 'primary',
    theme: {greyscale, common, primary},
  }) => ({
    color: handleTextColor({
      type: buttonType,
      disable: disabledButton,
      colors: {
        primary: common.black,
        primaryDisable: greyscale[4],
        secondary: common.white,
        secondaryDisable: greyscale[9],
        tertiary: primary,
        tertiaryDisable: greyscale[4],
      },
    }),
  }),
)<TextProps>``;

export const StyledButtonIcon = styled(View)<TextProps>`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

interface IconProp {
  theme: DefaultTheme;
  disabled: boolean;
}

// export const Icon = styled(Icons).attrs<IconProp>(
//   ({name, disabled, theme: {common, primary, greyscale}}) => ({
//     color: disabled
//       ? greyscale[8]
//       : name === 'facebook'
//       ? common.white
//       : name === 'refresh'
//       ? primary
//       : common.black,
//     size: wp(5.5),
//   }),
// )<IconProp>`
//   padding-right: ${wp(3)}px;
// `;
