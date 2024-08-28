import {FC} from 'react'
import {View} from 'react-native'

const IconNames = {
  home02: {path: require('./home-02.svg').default, colorAppliesTo: 'stroke'},
  barGroup: {path: require('./bar-group-03.svg').default, colorAppliesTo: 'stroke'},
  columnHorizontal: {path: require('./column-horizontal-01.svg').default, colorAppliesTo: 'stroke'},
  fileSearch: {path: require('./file-search-02.svg').default, colorAppliesTo: 'stroke'},
  ai: {path: require('./ai.svg').default, colorAppliesTo: 'fill'},
  chevron: {path: require('./chevron-down.svg').default, colorAppliesTo: 'fill'},
  cycling: {path: require('./cycling.svg').default, colorAppliesTo: 'fill'},
  eyeClosed: {path: require('./eye-closed.svg').default, colorAppliesTo: 'fill'},
  eyeOpen: {path: require('./eye-open.svg').default, colorAppliesTo: 'fill'},
  messageCircle: {path: require('./message-circle.svg').default, colorAppliesTo: 'stroke'},
  microphone: {path: require('./microphone-01.svg').default, colorAppliesTo: 'stroke'},
  nutrition: {path: require('./nutrition.svg').default, colorAppliesTo: 'fill'},
  running: {path: require('./running.svg').default, colorAppliesTo: 'fill'},
  share: {path: require('./share.svg').default, colorAppliesTo: 'stroke'},
  skiing: {path: require('./skiing.svg').default, colorAppliesTo: 'fill'},
  strength: {path: require('./strength.svg').default, colorAppliesTo: 'fill'},
  swimming: {path: require('./swimming.svg').default, colorAppliesTo: 'fill'},
  tennis: {path: require('./tennis.svg').default, colorAppliesTo: 'fill'},
  wellBeing: {path: require('./well-being.svg').default, colorAppliesTo: 'fill'},
  cross: {path: require('./x-02.svg').default, colorAppliesTo: 'fill'},
  arrowUp: {path: require('./arrow-up.svg').default, colorAppliesTo: 'fill'},
  bluetooth: {path: require('./bluetooth-01.svg').default},
  calendarCheck: {path: require('./calendar-check.svg').default},
  cardPayment: {path: require('./card-02.svg').default},
  notificationBox: {path: require('./notification-box.svg').default},
  user: {path: require('./user-profile-03.svg').default},
  users: {path: require('./users-profiles-02.svg').default},
}

export type IconName = keyof typeof IconNames

interface IconProps {
  name: IconName
  size: number
  color?: string
}

export const Icons:FC<IconProps> = (props) => {
  const Icon:FC<any> = IconNames[props.name]?.path

  if (!Icon) {return <View />}

  const iconProps = {
    [IconNames[props.name].colorAppliesTo]: props.color,
  }

  return (
    <Icon
      {...iconProps}
      width={props.size}
      height={props.size}
      // style={{width: props.size, height: props.size}}
    />
  )
}

Icons.defaultProps = {
  size: 24,
  color: '#081123',
}
