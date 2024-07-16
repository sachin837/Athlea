import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BackHeader, Text, WorkoutsRearrangeList } from 'components'
import { ScrollView } from 'react-native-gesture-handler'
import { MainContainer, StyledFAB, TitleContainer } from './TrainingPlanArrangement.styled'
import { useTheme } from 'styled-components/native'
import Icons from '../../../assets/icons/Icons'
import { useTrainingPlanArrangement } from './useTrainingPlanArrangement'

export const TrainingPlanArrangement = (props: any) => {
  console.log('props: ', props);

  const theme = useTheme()
  const { bottom } = useSafeAreaInsets()

  const {
    data,
    onCreateNew,
  } = useTrainingPlanArrangement()


  return (
    <MainContainer>
      <BackHeader title={'Rearrange workouts'} />
      <ScrollView contentContainerStyle={{ paddingBottom: bottom + 30 }}>
        <TitleContainer>
          <Text type={'heading3'} style={{ fontWeight: 'bold', color:'black' }}>{props?.route?.params?.title}</Text>
          <Text type={'subBody'} themeColor={'secondary'}>Drag workouts to change days. We recommend spacing out your workouts where possible</Text>
        </TitleContainer>
        <WorkoutsRearrangeList data={data} />
      </ScrollView>
      <StyledFAB onPress={onCreateNew}>
        <Icons name={'add'} color={theme.brand} size={12} />
      </StyledFAB>
    </MainContainer>
  )
}
