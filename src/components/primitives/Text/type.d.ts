import {TextProps as DefaultTextProps} from 'react-native'

export interface TextProps extends DefaultTextProps, StyledTextProps {
    type?: `${FontTypes}`
}

export interface StyledTextProps {
    weight?: '500'
    color?: string
    themeColor?: string
    centered?: boolean
    size?: number
}

export enum FontTypes {
    heading1 = 'heading1',
    heading2 = 'heading2',
    heading3 = 'heading3',
    subheading = 'subheading',
    body = 'body',
    subBody = 'subBody',
    small = 'small',
    tiny = 'tiny',
    superTiny = 'superTiny'
}
