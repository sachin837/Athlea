import {TrainingTypes} from '../_constants'

export const Colors = {
  black1: '#0F172A',
  black2: '#475569',
  black3: '#94A3B8',
  black4: '#CBD5E1',
  black5: '#E2E8F0',
  black6: '#F8FAFC',
  white: '#FFFFFF',

  blackNew1: '#1E1C39',
  blackNew2: '#484F6D',
  blackNew3: '#737593',
  blackNew4: '#E1E5EF',
  blackNew5: '#F9FBFC',

  purple: '#7300E6',
  green: '#14AE5C',
  green10: '#14AE5C1A',

  success500: '#56BE6C',
  success400: '#8ED49D',
  success300: '#ABDFB6',
  success200: '#C7E9CE',
  success100: '#E3F4E7',

  warning500: '#F59740',
  warning400: '#F8BA80',
  warning300: '#FACBA0',
  warning200: '#FCDCBF',
  warning100: '#FDEEDF',

  error500: '#F95F5F',
  error400: '#F88080',
  error300: '#FAA0A0',
  error200: '#FCBFBF',
  error100: '#F95F5F26',
  error50: '#F95F5F0D',

  [TrainingTypes.endurance]: '#37C6C4',
  [TrainingTypes.strength]: '#6580F4',
  [TrainingTypes.recovery]: '#D343DB',
  [TrainingTypes.nutrition]: '#63D571',
  [TrainingTypes.wellBeing]: '#FD8C5B',

  border: '#E3EAF8',
  background: '#F6F9FF',
}

export type ThemeColors = typeof Colors;
