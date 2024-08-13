// useRenderBodyText.js
import React from 'react'
import {Text, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {
  ActionTextStyle,
  GraphTextStyle,
  HighlightedTextStyle,
} from '../components/legacy/response/response.style'
import GraphPlusHeaderGraph from '../components/legacy/graphs/graphPlusHeader'
import CircleNumber from '../components/legacy/circleComponent'

const useRenderBodyTextWithNumber = ({aiActive}) => {
  const navigation = useNavigation()
  const [selectedActionIndex, setSelectedActionIndex] = React.useState(null)

  const renderBodyText = (
    text,
    highlightedSections,
    actions,
    graphType,
    setSelectedGraphIndex,
    selectedGraphIndex,
    handleActionPress,
  ) => {
    let counter = 1 // Initialize counter
    // Function to handle the press and set the graph data
    // Combine both highlighted sections and actions into one array for processing
    const combinedSections = [
      ...highlightedSections,
      ...actions,
      ...graphType,
    ].sort((a, b) => text.indexOf(a.text) - text.indexOf(b.text))

    let lastIndex = 0
    const renderedText = []

    combinedSections.forEach((section, index) => {
      const startIndex = text.indexOf(section.text, lastIndex)
      if (startIndex !== -1) {
        // Apply conditional styling for non-special text // Conditional style
        if (startIndex > lastIndex) {
          renderedText.push(
            <Text key={`text-${index}`}>
              {text.substring(lastIndex, startIndex)}
            </Text>,
          )
        }

        // Check the type of section and render accordingly
        if (section.actionType) {
          // This is an action
          renderedText.push(
            <ActionTextStyle
              key={`action-${index}`}
              isSelected={index === selectedActionIndex} // Adjust based on actual logic for selecting an action
              onPress={() => {
                handleActionPress({
                  text: section.text,
                  bodyPart: section.bodyPart,
                  category: section.category,
                })
                setSelectedActionIndex(index) // Assuming you have a way to set which action is selected
              }}>
              {section.text}
            </ActionTextStyle>,
          )
        } else if (section.type && section.type === 'graphType') {
          // Graph section
          renderedText.push(
            <GraphTextStyle
              key={`graph-${index}`}
              isSelected={index === selectedGraphIndex} // This prop controls the text style dynamically
              onPress={() => {
                // Toggle logic: if already selected, deselect (close graph), otherwise select
                setSelectedGraphIndex(
                  index === selectedGraphIndex ? null : index,
                )
              }}>
              {section.text}
            </GraphTextStyle>,
          )
          if (index === selectedGraphIndex) {
            renderedText.push(
              <GraphPlusHeaderGraph
                HeaderText={section.graphHeader}
                ScoreValue={section.graphScore}
                ScoreLabelText={section.graphLabel}
                graphType={section.graphType}
                key={`graph-component-${index}`}
                data={section.data}
                deviceType={section.deviceType}
              />,
            )
          }
          // Logic to render the graph component can be added here as needed
        } else {
          // This is a highlighted text linking to a source
          renderedText.push(
            <HighlightedTextStyle
              key={`highlight-${index}`}
              onPress={() =>
                navigation.navigate('WebViewScreen', {
                  sourceUrl: section.sourceUrl, // Use the URL from the section
                  source: section.text, // Or any other source information you want to pass
                })
              }>
              {section.text}
            </HighlightedTextStyle>,
          )
        }

        if (aiActive) {
          renderedText.push(
            <View
              key={`circle-${counter}`}
              style={{
                paddingLeft: 3,
              }}>
              <CircleNumber key={`circle-${counter}`} number={counter} />
            </View>,
          )
        }

        counter++ // Increment counter
        lastIndex = startIndex + section.text.length
      }
    })

    // Push remaining text
    if (lastIndex < text.length) {
      // Reapply the same conditional style
      renderedText.push(
        <Text key="text-end">{text.substring(lastIndex)}</Text>,
      )
    }

    return renderedText
  }

  return renderBodyText
}

export default useRenderBodyTextWithNumber
