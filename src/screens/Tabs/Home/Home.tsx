import {View, ScrollView, useWindowDimensions} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import {Text} from '../../../components'
import {OptionButton} from './components/Option'
import {RouteNames} from '../../../_constants'
import {Images} from '../../../assets/images'
import {Avatar, ContentContainer, OptionWrapper, Row, TitleWrapper} from './Home.styles'
import Icons from '../../../assets/icons/Icons'
import {Colors} from '../../../theme'


export const Home = () => {

  const navigation = useNavigation()
  const {width} = useWindowDimensions()

  return (
    <SafeAreaView style={{flex: 1}}>
      <TitleWrapper>
        <Text size={22}>athlea</Text>
      </TitleWrapper>
      <ScrollView
        horizontal
        snapToInterval={width}
        decelerationRate={'fast'}
        snapToAlignment={'center'}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, padding: 20, gap: 24}}
      >
        <ContentContainer>
          <View>
            <Row>
              <Text size={40}>Hey</Text>
              <Icons name={'ai'} size={45} color={Colors.purple} />
            </Row>
            <Text size={40}>Michael</Text>
          </View>
          <OptionWrapper>
            <OptionButton onPress={() => navigation.navigate(RouteNames.stats)}>Stats</OptionButton>
            <OptionButton onPress={() => navigation.navigate(RouteNames.stats)}>Training plan</OptionButton>
            <OptionButton onPress={() => navigation.navigate(RouteNames.stats)}>Strength</OptionButton>
            <OptionButton onPress={() => navigation.navigate(RouteNames.stats)}>Endurance</OptionButton>
            <OptionButton onPress={() => navigation.navigate(RouteNames.stats)}>Nutrition</OptionButton>
          </OptionWrapper>
        </ContentContainer>
        <View>
          <Avatar source={Images.randomPeople} />
        </View>
        <ContentContainer reverse>
          <View style={{marginTop: 41}}>
            <Text size={28} themeColor={'subtitle'} weight={'300'}>Discover...</Text>
          </View>
          <OptionWrapper reverse>
            <OptionButton onPress={() => navigation.navigate(RouteNames.stats)}>Sports</OptionButton>
            <OptionButton onPress={() => navigation.navigate(RouteNames.stats)}>Communities</OptionButton>
            <OptionButton onPress={() => navigation.navigate(RouteNames.stats)}>Clubs</OptionButton>
            <OptionButton onPress={() => navigation.navigate(RouteNames.stats)}>Teams</OptionButton>
            <OptionButton onPress={() => navigation.navigate(RouteNames.stats)}>Events</OptionButton>
            <OptionButton onPress={() => navigation.navigate(RouteNames.stats)}>Athletes</OptionButton>
          </OptionWrapper>
        </ContentContainer>
      </ScrollView>
    </SafeAreaView>
  )
}
