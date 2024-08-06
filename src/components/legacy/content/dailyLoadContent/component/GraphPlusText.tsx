import {View, Text} from 'react-native'
import React, {useState} from 'react'
import {
  ActivityText,
  Container,
  DescriptorContainer,
  DescriptorText,
  GraphContainer,
  HeaderContainer,
  ScoreHeader,
  ScoreLabel,
  ScoreText,
  ScoreTextContainer,
} from './graphPlusText.style'
import FullGraph from '../../../graphs/fullGraph'
import TimeSelector from '../../../selectors/TimeSelector'
import {useFilter} from '../../../../../contexts/FilterContext'
import TrainingItem from '../../../trainingItem'
import {useTheme} from 'styled-components/native'
import LoadSelector from '../../../selectors/LoadSelector'
import CommentComp from '../../../message/comment'
import CommentCompWhite from '../../../message/commentWhite'

interface Data {
  date: string;
  value: number;
}

interface Props {
  data: Data[];
  HeaderText: string;
  ScoreValue: string;
  ScoreLabelText: string;
  ScoreValue2?: string;
  ScoreLabel2?: string;
  DescriptionText: string;
  color?: string;
  paddingLeft?: number;
  keywords?: string[];
  time?: boolean;
}

const GraphPlusTextComponent = ({
  data,
  HeaderText,
  ScoreValue,
  ScoreLabelText,
  ScoreValue2,
  ScoreLabel2,
  paddingLeft,
  DescriptionText = '',
  color,
  keywords,
  currentDate,
  onScoreSelect,
  selectedScore,
  time,
  ShowComment = true,
  activity,
  labelColor,
  passedInColor,
  padding = 5,
  isWhiteTheme, // New prop
}: Props) => {
  const highlightKeywords = (text: string, keywords: string[] | undefined) => {
    if (!keywords) {
      return text
    }

    return text.split(' ').map((word, index) => {
      if (keywords.includes(word)) {
        return (
          <Text key={index} style={{fontWeight: 'bold'}}>
            {word}{' '}
          </Text>
        )
      }
      return (
        <Text key={index} style={{fontWeight: 'normal'}}>
          {word}{' '}
        </Text>
      )
    })
  }

  const convertToHoursAndMinutes = value => {
    const hours = Math.floor(value)
    const minutes = Math.round((value % 1) * 60)
    return (
      <Text>
        <ScoreText>{hours}</ScoreText>
        <ScoreLabel>hr </ScoreLabel>
        <ScoreText>{minutes}</ScoreText>
        <ScoreLabel>min</ScoreLabel>
      </Text>
    )
  }

  const [selectedTab, setSelectedTab] = useState('Description')

  // Function to handle the selection of the tab
  const handleSelection = option => {
    setSelectedTab(option) // Update the state with the new selected option
  }

  console.log('selected tab ', selectedTab)

  const theme = useTheme()
  return (
    <Container padding={padding}>
      <HeaderContainer>
        <ScoreHeader color={labelColor}>{HeaderText}</ScoreHeader>
        <ScoreTextContainer>
          {!time && (
            <>
              <ScoreText color={color}>{ScoreValue}</ScoreText>
              <ScoreLabel color={labelColor} paddingLeft={paddingLeft}>
                {ScoreLabelText}
              </ScoreLabel>
            </>
          )}
          {time && (
            <>
              <ScoreText color={color}>
                {convertToHoursAndMinutes(ScoreValue)}
              </ScoreText>
              <ScoreLabel color={labelColor} paddingLeft={paddingLeft}>
                {ScoreLabel2}
              </ScoreLabel>
            </>
          )}
        </ScoreTextContainer>
      </HeaderContainer>
      <GraphContainer>
        <FullGraph
          data={data}
          currentScore={ScoreValue}
          currentDate={currentDate}
          onScoreSelect={onScoreSelect}
          selectedScore={selectedScore}
          activity={activity}
          passedInColor={passedInColor}
          dateLabelColor={labelColor}
        />
      </GraphContainer>
      {activity && (
        <LoadSelector
          onSelect={handleSelection}
          options={['Description', 'Activities']}
          paddingHorizontal={53}
          marginHorizontal={0}
          selectedTab={selectedTab}
        />
      )}
      <DescriptorContainer>
        {selectedTab === 'Description' ? (
          <DescriptorText color={labelColor}>
            {ShowComment ? (
              isWhiteTheme ? (
                <CommentCompWhite
                  activity={activity}
                  MessageContent={DescriptionText}
                  TimeTextContent="Less than a minute ago"
                  speed={10}
                />
              ) : (
                <CommentComp
                  activity={activity}
                  MessageContent={DescriptionText}
                  TimeTextContent="Less than a minute ago"
                  speed={10}
                  animate={false}
                />
              )
            ) : (
              highlightKeywords(DescriptionText, keywords)
            )}
          </DescriptorText>
        ) : (
          <>
            <TrainingItem
              CategoryTitleText="Recovery"
              TitleText="Stretching Session"
              DateText={selectedScore.date}
              IconName="recoveryicon"
              gradientColors={theme.gradients.recovery.colors}
              iconSize={2.5}
            />
            <TrainingItem
              CategoryTitleText="Endurance"
              TitleText="Cycling Session"
              DateText={selectedScore.date}
              IconName="enduranceicon"
              gradientColors={theme.gradients.endurance.colors}
              iconSize={2.5}
            />
          </>
        )}
      </DescriptorContainer>
    </Container>
  )
}

export default GraphPlusTextComponent
