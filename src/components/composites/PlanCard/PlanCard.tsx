import {useState, FC} from 'react'
import {TouchableOpacity, View} from 'react-native'
import Icons from 'react-native-vector-icons/Ionicons'
import Collapsible from 'react-native-collapsible'
import {Colors} from 'theme'
import {TrainingNames, TrainingTypes} from '_constants'
import {Text} from '../../primitives'
import {Indicator} from '../../basic'
import {
  Container,
  RowCenter,
  RowSpace,
  Row,
  TrainingBarsContainer,
  TrainingBar,
  TrainingDetailContainer,
  TrainingDetails,
} from './PlanCard.styles'


interface Measure {
  label: string,
  value: string | number,
  measure?: string
}

interface TrainingResult {
  category: `${TrainingTypes}`
  date: string
  measurements: Measure[]
  target: Measure[]
  complete: boolean
}

interface Props {
  title: string
  trainingResults: TrainingResult[]
  onPress?: () => void
}

export const PlanCard:FC<Props> = (props) => {

  const [isCollapsed, setIsCollapsed] = useState(true)

  const getBarColor = (item: TrainingResult) => item.complete ? Colors[item.category] : Colors.black5


  return (
    <Container>
      <RowSpace>
        <TouchableOpacity onPress={props.onPress}>
          <Row>
            <Text type={'body'} bold>{props.title}</Text>
            <Icons name={'chevron-forward-outline'} size={18} color={Colors.black3} />
          </Row>
        </TouchableOpacity>
      </RowSpace>
      <TrainingBarsContainer>
        {props.trainingResults.map((item, index) => (
          <TrainingBar key={index} background={getBarColor(item)} />
        ))}
      </TrainingBarsContainer>
      <Collapsible collapsed={isCollapsed}>
        <TrainingDetails>
          {props.trainingResults.map((item, index) => (
            <TrainingDetailContainer key={index}>
              <View style={{gap: 4}}>
                <Row>
                  <Icons name={'person-outline'} size={24} />
                  <Text type={'body'} themeColor={item.category} bold>
                    {TrainingNames[item.category]}
                  </Text>
                </Row>
                <Text type={'small'} themeColor={'secondary'}>{item.date}</Text>
              </View>
              <RowSpace>
                {item.measurements.map((measure, measureIndex) => (
                  <Indicator
                    key={measureIndex}
                    label={measure.label}
                    value={measure.value}
                    measure={measure.measure}
                  />
                ))}
              </RowSpace>
            </TrainingDetailContainer>
          ),
          )}
        </TrainingDetails>
      </Collapsible>
      <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
        <RowCenter>
          <Text type={'body'} themeColor={'subtitle'}>Show more</Text>
          <Icons name={'chevron-down-outline'} size={18} color={Colors.black3} />
        </RowCenter>
      </TouchableOpacity>
    </Container>
  )
}
