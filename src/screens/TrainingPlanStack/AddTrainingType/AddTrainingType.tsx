import { BackHeader, Text } from '../../../components'
import Icons from '../../../assets/icons/Icons'
import { MainContainer, styles, TitleContainer, SectionContainer, StarIcon, ItemContainer } from './AddTrainingType.styles'
import { ScrollView, FlatList, Alert , TouchableOpacity} from 'react-native'
import { useAddTrainingType } from './useAddTrainingType'
import { View } from 'react-native-animatable'


export const AddTrainingType = () => {
  const { data, ManualEntry,onStrengthTraining } = useAddTrainingType()
  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ flex: 1, margin: 4, }} activeOpacity={0.9} onPress={() => onStrengthTraining()} >
      <ItemContainer>
        <StarIcon name="star" size={20} color="#CBD5E1" />
      </ItemContainer>
      <Text style={{ padding: 5, fontWeight: 'bold', color: 'black', fontSize: 14}}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <MainContainer>
      <BackHeader
        title={'Add session'}
        rightComponent={<Icons name={'add'} size={16} onPress={() => ManualEntry()}/>}
      />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <TitleContainer>
          <Text type={'heading2'} style={{ fontWeight: 'bold', color: 'black' }}>Strength sessions library</Text>
          <Text type={'subBody'} themeColor={'subtitle'}>Select from available sessions or add new</Text>
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
    </MainContainer >
  )
}
