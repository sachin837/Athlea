import {FC} from 'react'
import {StyleSheet} from 'react-native'
import {Tab, TabContainer} from './TabBar.styles'
import {Text} from '../../primitives'

interface Tab {
  title: string
  key: string
}

interface Props {
  selected: number
  tabs: Tab[]
  setSelected: (value: number) => void
}

export const TabBar:FC<Props> = (props) => {
  const {selected, tabs, setSelected} = props
  const isActive = (i: number) => i === selected

  return (
    <TabContainer>
      {tabs.map((item, index) => (
        <Tab style={styles.shadow} active={isActive(index)} onPress={() => setSelected(index)}>
          <Text type={'small'} themeColor={isActive(index) ? 'tabActiveText' : 'tabText'}>{item.title}</Text>
        </Tab>
      ))}
    </TabContainer>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#0000001F',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2.62,
    elevation: 4,
  },
})
