import {IMessage} from 'react-native-gifted-chat'
import {FontTypes} from '../components/primitives/Text/type'
import {IconTypes} from '../assets/icons/IconTypes'
import {IconName} from '../assets/icons'


export interface Message extends IMessage {
  options?: MessageOption[]
  multiselect?: boolean
  fontType?: `${FontTypes}`
}

export interface MessageOption {
  label: string
  value: string
  icon?: IconName
}
