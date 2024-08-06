import { useCallback } from 'react'
import { FlatList, View } from 'react-native'
import { TabView } from 'react-native-tab-view'
import { RouteNames } from '_constants'
import { HomeHeader, PlanCard, PreviewByDay, TabBar, Timeline } from 'components'
import { HeaderContainer, HorizontalContainer } from './Train.styled'
import { TrainTabs, useTrain } from './useTrain'
import { useTheme } from 'styled-components/native'

export const Train = (props) => {

  const {
    data,
    selectedTab,
    setSelectedTab,
    routes,
    onLayout,
    tabsHeight,
  } = useTrain()
  const theme = useTheme()

  const renderItem = useCallback(({ item, index }) => (
    <PlanCard
      title={item.title}
      trainingResults={item.data}
      onPress={() => props.navigation.navigate(RouteNames.trainingPlanArrangement, item)}
    />
  ), [])

  const renderScene = ({ route }) => {
    switch (route.key) {
      case TrainTabs.phases:
        return <Timeline onLayout={onLayout(0)} />
      case TrainTabs.calendar:
        return (
          <HorizontalContainer>
            <PreviewByDay onLayout={onLayout(1)} data={[]} />
          </HorizontalContainer>
        )
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.pageBackground }}>
      <HomeHeader />
      <FlatList
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={
          <HeaderContainer>
            <HorizontalContainer>
              <TabBar
                tabs={routes}
                selected={selectedTab}
                setSelected={setSelectedTab}
              />
            </HorizontalContainer>
            <TabView
              swipeEnabled={false}
              onIndexChange={setSelectedTab}
              navigationState={{ index: selectedTab, routes }}
              initialLayout={{ height: 300 }}
              renderScene={renderScene}
              renderTabBar={() => null}
              style={{ height: tabsHeight[selectedTab], }}
            />
          </HeaderContainer>
        }
        contentContainerStyle={{ gap: 16, padding: 16 }}
      />
    </View>
  )
}
