import {ImageSourcePropType, StyleProp, ViewStyle} from "react-native";

export interface ProfileImageProps {
    source?: ImageSourcePropType
    letter?: string
    style?: StyleProp<ViewStyle>
    edit?: boolean
    onPress?: () => void
    size?: number
    backgroundColor?: string
}
