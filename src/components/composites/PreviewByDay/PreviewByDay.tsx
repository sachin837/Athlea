import {View, StyleSheet, LayoutChangeEvent} from 'react-native'
import {FC} from 'react'
import {Colors} from 'theme'
import {Text} from '../../primitives/Text'
import {usePreviewByDay} from './usePreviewByDay'
import {Container, Day, DayRing, DaysContainer, Row} from './PreviewByDay.styled'


interface Props {
  data: Array<{
    week: string
    trainingTime: string
    byDays: number[]
  }>
  onLayout?: (event: LayoutChangeEvent) => void
}

export const PreviewByDay:FC<Props> = (props) => {

  const {onContainerLayout, cellSize, getRingSize, getTime} = usePreviewByDay(props)

  const data = [
    {week: '1-5 May', trainingTime: '3h 24m', byDays: [-1, -1, 2644, 2400, 3400, 6000, 5000, 0]},
    {week: '6-12 May', trainingTime: '3h 24m', byDays: [560, 4000, 350, 2400, 3400, 6000, 5000, 0]},
    {week: '13-19 May', trainingTime: '3h 24m', byDays: [560, 4000, 350, 2400, 3400, 6000, 5000, 0]},
    {week: '20-26 May', trainingTime: '3h 24m', byDays: [560, 4000, 350, 2400, 3400, 6000, 5000, 0]},
    {week: '27-31 May', trainingTime: '3h 24m', byDays: [560, 4000, 350, 2400, 3400, 6000, -1, -1]},
  ]

  return (
    <Container onLayout={onContainerLayout}>
      {data.map((week) => (
        <View>
          <Row>
            <Text type={'small'}>{week.week}</Text>
            <Text type={'tiny'}>{week.trainingTime}</Text>
          </Row>
          <DaysContainer>
            {week.byDays.map(seconds => (
              <Day size={cellSize} rest={seconds === 0} noRecord={seconds === -1}>
                {seconds > 0 && (
                  <DayRing size={getRingSize(seconds)}>
                    <Text type={'superTiny'} color={Colors.white}>{getTime(seconds)}</Text>
                  </DayRing>
                )}
              </Day>
            ))}
          </DaysContainer>
        </View>
      ))}
    </Container>
  )
}


const styles = StyleSheet.create({
  textContainer: {

  },
})
