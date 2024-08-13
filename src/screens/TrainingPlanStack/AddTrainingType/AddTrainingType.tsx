import { BackHeader, Text } from '../../../components'
import { ScrollView, FlatList, TouchableOpacity } from 'react-native'
import { useTheme } from 'styled-components/native'
import { MainContainer, styles, TitleContainer, SectionContainer, StarIcon, ItemContainer } from './AddTrainingType.styles'
import { useAddTrainingType } from './useAddTrainingType'
import Icons from '../../../assets/icons/Icons'

export const AddTrainingType = () => {
  const theme = useTheme()
  const { data, ManualEntry, onStrengthTraining } = useAddTrainingType()

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ flex: 1, margin: 4, }} activeOpacity={0.9} onPress={() => onStrengthTraining()} >
      <ItemContainer>
        <StarIcon name="star" size={20} color="#CBD5E1" />
      </ItemContainer>
      <Text type={'heading3'} weight='bold' size={14} themeColor={'subtitle'} padding={4}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <MainContainer>
      <BackHeader
        title={'Add session'}
        rightComponent={<Icons name={'add'} size={16} onPress={() => ManualEntry()} />}
      />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <TitleContainer>
          <Text type={'heading2'} weight='bold' themeColor={'subtitle'}>{"Strength sessions library"}</Text>
          <Text type={'subBody'} themeColor={'subtitle'}>{"Select from available sessions or add new"}</Text>
        </TitleContainer>
        <SectionContainer>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={{ justifyContent: 'center', paddingHorizontal: 1 }}
          />
        </SectionContainer>
      </ScrollView>
    </MainContainer>
  )
}
