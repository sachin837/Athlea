import {NativeSyntheticEvent, NativeTouchEvent} from 'react-native';
export type FontTypes =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'body1'
  | 'body2'
  | 'subtitle1'
  | 'subtitle2'
  | 'caption'
  | 'overline';

export type FontWeight = 'extraBold' | 'bold' | 'medium' | 'regular' | 'thin';
export type FontAlign = 'left' | 'center' | 'right';
export type FontStyle = 'normal' | 'italic';
export interface StrictTypoProps {
  children: string | string[] | Element;
  type?: FontTypes;
  align?: FontAlign;
  fontStyle?: FontStyle;
  lineHeight?: number | undefined;
  showUnderline?: boolean;
  fontWeight?: FontWeight;
  paddingHorizontal?: number;
  paddingVertical?: number;
  link?: string | null;
  onPress?: (ev?: NativeSyntheticEvent<NativeTouchEvent>) => void | undefined;
  testID?: string | undefined;
  nameScreen?: string;
  removeBottomSpace?: boolean;
  color?: string;
  letterSpacing?: number;
}
