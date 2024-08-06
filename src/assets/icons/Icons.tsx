import {createIconSetFromFontello} from 'react-native-vector-icons'
import fontelloConfig from '../fonts/fontello.json'
import Icon from 'react-native-vector-icons/Ionicons'
import {IconTypes} from './IconTypes'

type AthleaIconType = typeof Icon & {name: IconTypes}

const AthleaIcons = createIconSetFromFontello(fontelloConfig) as AthleaIconType

export default AthleaIcons
