import React, {FunctionComponent} from 'react';
import {Container, Icon} from './iconButton.style.tsx';
import {IconTypes} from '../../../assets/icons/IconTypes.tsx';
import {TouchableOpacity} from 'react-native';

type Props = {
  type: IconTypes;
  size: number;
  backgroundColor?: string;
  borderColor: string;
  iconColor?: string;
  onPress: () => void;
  iconSize?: number;
};

export const IconButton: FunctionComponent<Props> = ({
  type,
  size,
  backgroundColor = '#ffffffff',
  borderColor,
  iconColor,
  onPress,
  iconSize,
}) => {
  return (
    <Container
      size={size}
      color={backgroundColor}
      borderColor={borderColor}
      onPress={onPress}>
      <Icon type={type} size={iconSize} color={iconColor} />
    </Container>
  );
};
