import {View, Text} from 'react-native'
import React, {useState} from 'react'
import {
  BodyContainer,
  BodyText,
  DurationText,
  GradientContainer,
  HeaderContainer,
  Icon,
  CategoryText,
  SubHeaderContainer,
  SubHeaderText,
  TitleBodyText,
  TitleContainer,
  DurationContainer,
} from './ActivityComponent.style'
import {Container} from '../dailyPlan.style'
import {useTheme} from 'styled-components/native'
import CommentComp from '../../../message/comment'
import SuggestionComp from '../../../message/suggestion'
import useAnimateText from '../../../../../utils/animateText'
import ActionsComp from '../../../message/actions'
import AdviceModal from '../../../modals/advice'

const ActivityComponent = ({
  name,
  iconSize,
  gradientColors,
  ActivityName,
  ActivityCategory,
  Duration,
  BodyTextContent,
  gradientSize,
  Field1Text,
  Field2Text = '',
  Field3Text = '',
  Field4Text,
  ShowDuration = true,
  CommentContent = '',
  showComment = false,
  botType = 'default',
  MostRecentActionText,
}) => {
  const theme = useTheme()
  const [modalVisible, setModalVisible] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const handleActionPress = action => {
    // Show the action sheet
    // Destructure the needed properties
    console.log('Setting modal content with:', action) // Ensure action contains what you expect
    setModalContent({
      text: action.text,
      bodyPart: action.bodyPart,
      category: action.category,
    })
    setModalVisible(true) // Show the modal
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  // Ensure this prop is used
  // Function to render the body text with dynamic styling
  const renderFormattedBodyText = content => {
    // Split the content into lines for processing
    const lines = content.split('\n')

    // Use flatMap to process each line and return an array of components
    return lines
      .flatMap((line, index) => {
        // Check if the line is empty or just a bullet point, and skip rendering
        if (line.trim() === '' || line.trim() === '•') {
          return null // Return null to indicate nothing should be rendered for this line
        }

        // Find the index of the first colon in the line
        const colonIndex = line.indexOf(':')
        if (colonIndex !== -1) {
          // Process lines with a colon, splitting into header and the rest
          const header = line.substring(0, colonIndex).trim()
          let rest = line.substring(colonIndex + 1).trim()

          // Split the rest of the content by bullet points for additional paragraphs
          const bulletPoints = rest
            .split('•')
            .map(point => point.trim())
            .filter(point => point)

          return [
            <View key={`${index}-header`} style={{marginBottom: 10}}>
              <TitleBodyText>{header}:</TitleBodyText>
            </View>,
            ...bulletPoints.map((point, bulletIndex) => (
              <View
                key={`${index}-bullet-${bulletIndex}`}
                style={{
                  marginLeft: 20,
                  marginTop: 5,
                }}>
                <BodyText>• {point}</BodyText>
              </View>
            )),
            <View
              key={`${index}-paragraph-break`}
              style={{marginBottom: 10}}
            />, // Add a break after bullet points
          ]
        } else {
          // If line doesn't start with a bullet, add one
          if (!line.startsWith('•')) {
            line = '• ' + line
          }
          // Render lines without a colon as bullet points
          return (
            <BodyText key={index} style={{marginLeft: 20, marginBottom: 20}}>
              {line}
            </BodyText>
          )
        }
      })
      .filter(component => component !== null) // Filter out null entries
  }

  return (
    <>
      <Container>
        <HeaderContainer>
          <SubHeaderContainer>
            <GradientContainer
              size={gradientSize}
              gradientColors={gradientColors}>
              <Icon size={iconSize} name={name} />
            </GradientContainer>
            <TitleContainer>
              <CategoryText>{ActivityCategory}</CategoryText>
              <SubHeaderText>{ActivityName}</SubHeaderText>
            </TitleContainer>
          </SubHeaderContainer>
          <DurationContainer>
            {ShowDuration && <CategoryText>Duration</CategoryText>}
            <DurationText>{Duration}</DurationText>
          </DurationContainer>
        </HeaderContainer>
        <BodyContainer>
          {renderFormattedBodyText(Field1Text)}
          {renderFormattedBodyText(Field2Text)}
          <ActionsComp
            MessageContent={MostRecentActionText}
            handleActionPress={handleActionPress}
          />
          {renderFormattedBodyText(Field3Text)}
        </BodyContainer>
        {showComment && (
          <View
            style={{
              paddingLeft: 6,
            }}>
            <SuggestionComp
              MessageTextContent={CommentContent}
              TimeTextContent="last updated 1 minute"
              botType={botType}
            />
          </View>
        )}
      </Container>
      {modalVisible && (
        <AdviceModal
          isVisible={modalVisible}
          onClose={handleCloseModal}
          actions={modalContent}
        />
      )}
    </>
  )
}

export default ActivityComponent
