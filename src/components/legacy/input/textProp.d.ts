import {iconTypes} from '../../../assets/icons/IconTypes.tsx';

export interface StrictTextInputProps {
  title?: string | undefined;
  optionText?: string | undefined;
  value?: string | number;
  editable?: boolean;
  removeBottomSpace?: boolean;
  errors?: string | boolean;
  placeholder?: string;
  testID?: string;
  handleChange: (text: string) => void;
  iconName?: iconTypes | undefined;
  iconSize?: number | undefined;
  iconHandleClick?: () => void | undefined;
  maxLength?: number;
  loading?: boolean;
  handleSubmit?: () => void | undefined;
  focused?: boolean;
  onMaxLengthReached?: () => void | undefined;
  showMaxChar?: boolean;
  unit?: string | undefined;
}
