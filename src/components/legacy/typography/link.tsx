import React, {FunctionComponent} from 'react';
import {Linking} from 'react-native';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';

import {StrictTypoProps} from './typography';
import {TextStyled} from './typography.style.tsx';

const Link: FunctionComponent<StrictTypoProps> = ({
  children = '',
  type = 'body1',
  align,
  showUnderline,
  paddingHorizontal = 0,
  link = null,
  onPress,
  testID,
  nameScreen,
  fontWeight,
  removeBottomSpace,
  color,
  letterSpacing,
}) => {
  const navigation = useNavigation() || null;
  const onLink = async () => {
    const EmailIsValid = yup.string().email();
    const UrlIsValid = yup.string().url();
    if (onPress) {
      onPress();
    }

    if (await EmailIsValid.isValid(link)) {
      Linking.openURL(`mailto:${link}`);
    } else if (await UrlIsValid.isValid(link)) {
      navigation.navigate('WebView', {
        sourceUrl: link,
        source: nameScreen,
      });
    }
  };
  return (
    <TextStyled
      testID={testID}
      type={type}
      fontWeight={fontWeight}
      align={align}
      showUnderline={showUnderline}
      paddingHorizontal={paddingHorizontal}
      allowFontScaling={false}
      color={color}
      letterSpacing={letterSpacing}
      removeBottomSpace={removeBottomSpace}
      onPress={() => onLink()}>
      {children}
    </TextStyled>
  );
};

export default Link;
