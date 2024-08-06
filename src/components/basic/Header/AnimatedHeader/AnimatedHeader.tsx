import {Header, HeaderProps} from '@codeherence/react-native-header'
import {TouchableOpacity} from 'react-native'
import {Text} from '../../../primitives/Text'
import Icons from 'react-native-vector-icons/MaterialIcons'
import {Row} from './AnimatedHeader.styled'
import {runOnJS, useAnimatedStyle, useDerivedValue} from 'react-native-reanimated'
import {FC, useState} from 'react'
import Toast from 'react-native-toast-message'
import show = Toast.show
import {useNavigation} from '@react-navigation/native'


interface Props extends HeaderProps {

}

interface RProps {
  title: string
  previousScreenName: string
}

export const AnimatedHeader = ({title, previousScreenName}: RProps):FC<Props> => ({showNavBar}) => {

  const navigation = useNavigation()
  const [showBar, setShowBar] = useState(false)

  useDerivedValue(() => {
    runOnJS(setShowBar)(!!showNavBar.value)
  })

  return (
    <Header
      showNavBar={showNavBar}
      headerLeft={
        <TouchableOpacity onPress={navigation.goBack}>
          <Row>
            <Icons name={'chevron-left'} />
            <Text>{previousScreenName}</Text>
          </Row>
        </TouchableOpacity>
      }
      headerCenter={<Text type={'subheading'} medium>{title}</Text>}
      headerRight={<Icons name={'stars'} size={20} />}
      headerRightFadesIn={true}
      headerStyle={{backgroundColor: showBar ? 'white' : 'transparent', borderBottomWidth: 0, paddingBottom: 15}}
      noBottomBorder
    />
  )
}
