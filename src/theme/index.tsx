import {Colors} from './colors.ts'
import {DefaultTheme} from 'styled-components/native'
import {TrainingTypes} from '../_constants'

export * from './colors.ts'

const base: DefaultTheme = {
  primary: '#000000',
  secondary: Colors.black2,
  cardBackground: Colors.white,
  subtitle: Colors.blackNew3,
  border: Colors.border,
  tabBackground: Colors.blackNew5,
  tabActiveText: Colors.blackNew2,
  button: Colors.purple,
  tabText: Colors.blackNew3,
  divider: Colors.black5,
  brand: Colors.purple,
  white: Colors.white,
  placeholder: Colors.black4,
  [TrainingTypes.endurance]: Colors[TrainingTypes.endurance],
  [TrainingTypes.strength]: Colors[TrainingTypes.strength],
  [TrainingTypes.wellBeing]: Colors[TrainingTypes.wellBeing],
  [TrainingTypes.recovery]: Colors[TrainingTypes.recovery],
  [TrainingTypes.nutrition]: Colors[TrainingTypes.nutrition],
  primaryscale: {
    1: '#FAFAFA',
    2: '#F5F5F5',
    3: '#EEEEEE',
    4: '#E0E0E0',
    5: '#BDBDBD',
    6: '#949494',
    7: '#757575',
    8: '#575757',
    9: '#424242',
    10: '#212121',
  },
  black1: '#081123',
  black2: '#475569',
  black3: '#94A3B8',
  black5: Colors.black5,
  black6: Colors.black6,
  font: '#081123',
  black6: '#F8FAFC',
  error500: '#F95F5F',
  third: '#9746FF',
  fourth: '#5390DF',
  background: '#FFFFFF',
  panelbackground: '#F3F3F3',
  pageBackground: '#F6F9FF',
  black: '#000000',
  borderColor: '#cacaca',
  supportingscale: {
    primary: {
      1: '#560119', // darkest shade
      2: '#8B1033',
      3: '#CB0B45',
      4: '#E9195D',
      5: '#F94A8C',
      6: '#FE68A4',
      7: '#FFA2CA',
      8: '#FECCF2',
      9: '#FEE5F0',
      10: '#FEF1F6', // lightest shade
    },
    secondary: {
      1: '#3A0B6A', // darkest shade
      2: '#5C169C',
      3: '#6F18BF',
      4: '#851EE3',
      5: '#9330F7',
      6: '#9746FF',
      7: '#B485FF',
      8: '#CCB1FF',
      9: '#E8D4FF',
      10: '#F7F2FF', // lightest shade
    },
  },
  gradients: {
    strength: {
      colors: ['#6580F4', '#A57AEC'],
      start: {x: 0, y: 0},
      end: {x: 1, y: 1},
    },
    endurance: {
      colors: ['#4BE6B2', '#37C6C4'],
      start: {x: 0, y: 0},
      end: {x: 1, y: 1},
    },
    wellbeing: {
      colors: ['#FECC45', '#FD8C5B'],
      start: {x: 0, y: 0},
      end: {x: 1, y: 1},
    },
    recovery: {
      colors: ['#F259DF', '#D343DB'],
      start: {x: 0, y: 0},
      end: {x: 1, y: 1},
    },
    nutrition: {
      colors: ['#A1ED7E', '#63D571'],
      start: {x: 0, y: 0},
      end: {x: 1, y: 1},
    },
  },
  font: {
    size: {
      1: '10', // equivalent to 13px
      2: '12', // equivalent to 16px
      3: '14', // equivalent to 18.66px
      4: '16', // equivalent to 21.33px
      5: '18', // equivalent to 24px
      6: '20', // equivalent to 26.66px
      7: '24', // equivalent to 32px
      8: '32', // equivalent to 42.66px
      9: '96', // equivalent to 128px
    },
    weight: {
      thin: 300,
      regular: 400,
      medium: 500,
      bold: 700,
      extraBold: 800,
    },
    family: ['DM Sans'],
  },
  borderRadius: {
    xs: '1px',
    sm: '6px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    xxl: '100px',
  },
  // Base on screen resulotion is 812 x 375
  space: {
    xs: '1', // 8px
    sm: '2', // 16px
    md: '3', // 24px
    lg: '4', // 32px
    xl: '5', // 40px
    xxl: '6', // 48px
  },
}



export default {
  light: {
    name: 'Light',
    ...base,
  },
  dark: {
    name: 'Dark',
    ...base,
  },
}
