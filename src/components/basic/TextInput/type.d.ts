import {StyleProp, TextInputProps as DefaultTextInputProps, ViewStyle} from 'react-native'
import {ReactElement} from 'react'

export interface TextInputProps extends Omit<DefaultTextInputProps, 'onFocus', 'onBlur'> {
    label?: string
    optionalLabel?: string
    inputStyle?: StyleProp<ViewStyle>
    errorText?: string
    icon?: ReactElement
    setFocused?: (value: boolean) => void
    password?: boolean
}
