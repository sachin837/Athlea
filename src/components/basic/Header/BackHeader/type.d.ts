import {ReactElement} from "react";

export interface HeaderProps {
    ignoreInsets?: boolean
    title?: string
    rightComponent?: ReactElement
    onBack?: () => void
}
