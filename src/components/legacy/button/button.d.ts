import {GestureResponderEvent} from 'react-native';

export type ButtonTypes =
  | 'primary'
  | 'secondary'
  | 'third'
  | 'refresh'
  | 'facebook'
  | 'google'
  | 'apple'
  | 'edit'
  | 'bluetooth';

export interface StrictButtonProps {
  type?: ButtonTypes;
  text: string;
  textColor?: string;
  disabled?: boolean;
  endAdornment?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  testID?: string;
  removeBottomSpace?: boolean;
  iconName?: string;
  customWidthSize?: number;
  customAspectRatio?: {widthRatio: number; heightRatio: number};
  style?: CSSProperties;
}
