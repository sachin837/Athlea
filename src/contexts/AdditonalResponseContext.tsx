import React, {createContext, useContext, useRef, useState} from 'react'

const additionalResponses = [
  {
    ThreadHeaderText:
      'How long should I rest before I can consider myself fully recovered from a workout?',
    ThreadBodyText:
      'The time needed for full recovery from a workout varies depending on several factors, including the intensity of your exercise, your fitness level, and your overall health. However, here are some general guidelines to help you gauge your recovery period:\n\n1. Intensity of the Workout: After a moderate-intensity workout, you may need 24-48 hours of rest. For high-intensity or strenuous workouts, recovery can take up to 72 hours or more.\n\n2. Listen to Your Body: Pay attention to how your body feels. If you\'re still experiencing muscle soreness, fatigue, or reduced performance, you may need more time to recover.\n\n3. Sleep: Adequate sleep is crucial for recovery. Aim for 7-9 hours of quality sleep each night to support muscle repair and overall recovery.\n\n4. Nutrition: Proper nutrition is essential. Consume a balanced diet rich in protein, carbohydrates, and healthy fats to aid in muscle recovery and energy replenishment.\n\n5. Hydration: Stay well-hydrated, as dehydration can slow down the recovery process.\n\n6. Active Recovery: Incorporate light exercises like walking, swimming, or yoga on rest days to improve blood circulation and reduce muscle stiffness.\n\n7. Stretching and Mobility: Regular stretching and mobility exercises can help prevent injuries and enhance flexibility.\n\n8. Massage and Foam Rolling: These techniques can alleviate muscle tension and promote tissue healing.\n\nRemember that everyone\'s body is different, so it\'s essential to listen to your body\'s signals. If you\'re unsure about your recovery, consider consulting with a fitness professional or healthcare provider.',
    highlightedSections: [
      {
        text: 'Intensity of the Workout:',
        reference: 'source',
        sourceUrl: 'www.example.com/source1',
      },
      {
        text: 'Listen to Your Body:',
        reference: 'source',
        sourceUrl: 'www.example.com/source2',
      },
      {
        text: 'Sleep:',
        reference: 'source',
        sourceUrl: 'www.example.com/source3',
      },
      {
        text: 'Nutrition:',
        reference: 'source',
        sourceUrl: 'www.example.com/source4',
      },
      {
        text: 'Hydration:',
        reference: 'source',
        sourceUrl: 'www.example.com/source5',
      },
      {
        text: 'Active Recovery:',
        reference: 'source',
        sourceUrl: 'www.example.com/source6',
      },
      {
        text: 'Stretching and Mobility:',
        reference: 'source',
        sourceUrl: 'www.example.com/source7',
      },
      {
        text: 'Massage and Foam Rolling:',
        reference: 'source',
        sourceUrl: 'www.example.com/source8',
      },
    ],
    actions: [],
    graphType: [],
    Tag1: true,
    Tag2: true,
    Tag3: true,
    id: '1',
    SourceNum: 8,
    ViewAmount: 2000,
    accuracy: '78% accuracy',
    categories: ['Recovery', 'Fitness', 'Workout'],
    notifications: [
      {
        BotTextContent: 'Athlea',
        TimeTextContent: '78% Compatibility Rating',
        MessageTextContent:
          'This thread provides comprehensive information on workout recovery and factors to consider for a faster and more effective recovery process.',
      },
    ],
    sources: [
      {
        sourcecontent: 'Source content for Intensity of Workout and Liste...',
        source: 'Web',
        iconName: 'web',
        sourceUrl: 'www.example.com/source1',
      },
      {
        sourcecontent: 'Source content for Listening to Your Body...',
        source: 'Web',
        iconName: 'web',
        sourceUrl: 'www.example.com/source2',
      },
      {
        sourcecontent: 'Source content for Sleep and Recovery...',
        source: 'Web',
        iconName: 'web',
        sourceUrl: 'www.example.com/source3',
      },
      {
        sourcecontent: 'Source content for Nutrition and Recovery...',
        source: 'Web',
        iconName: 'web',
        sourceUrl: 'www.example.com/source4',
      },
      {
        sourcecontent: 'Source content for Hydration and Recovery...',
        source: 'Web',
        iconName: 'web',
        sourceUrl: 'www.example.com/source5',
      },
      {
        sourcecontent: 'Source content for Active Recovery Techniques...',
        source: 'Web',
        iconName: 'web',
        sourceUrl: 'www.example.com/source6',
      },
      {
        sourcecontent: 'Source content for Stretching and Mobility...',
        source: 'Web',
        iconName: 'web',
        sourceUrl: 'www.example.com/source7',
      },
      {
        sourcecontent: 'Source content for Massage and Foam Rolling...',
        source: 'Web',
        iconName: 'web',
        sourceUrl: 'www.example.com/source8',
      },
    ],
    data: [
      {
        dataContent:
          'Data content related to Building Endurance for Long-Distance Running...',
        data: 'Research Data',
        iconName: 'csv',
      },
      {
        dataContent:
          'Data content related to Building Endurance for Long-Distance Running...',
        data: 'Research Data',
        iconName: 'csv',
      },
      {
        dataContent:
          'Data content related to Building Endurance for Long-Distance Running...',
        data: 'Research Data',
        iconName: 'csv',
      },
      {
        dataContent:
          'Data content related to Building Endurance for Long-Distance Running...',
        data: 'Research Data',
        iconName: 'csv',
      },
    ],
    suggestions: [
      {
        suggestionText:
          'What are the best recovery techniques for muscle soreness after a workout?',
      },
      {
        suggestionText:
          'Can you provide tips for preventing injuries during workouts?',
      },
      {
        suggestionText:
          'How can I optimize my nutrition for better workout recovery?',
      },
    ],
  },
]

const AdditionalResponsesContext = createContext()

export const useAdditionalResponses = () =>
  useContext(AdditionalResponsesContext)

export const AdditionalResponsesProvider = ({children}) => {
  const [selectedThread, setSelectedThread] = useState(null)

  const mainScrollRef = useRef(null)

  const clearSelectedThread = () => {
    setSelectedThread(null)
  }

  const handleSuggestionSelect = suggestionText => {
    console.log('suggestionText', suggestionText)
    const matchedResponse = additionalResponses.find(
      response => response.ThreadHeaderText === suggestionText,
    )

    // If there's a matched response, update the context's selected thread.
    if (matchedResponse) {
      setSelectedThread(matchedResponse)
    } else {
      // If no response is found, or to handle a case where the input doesn't match,
      // you might want to clear the selected thread or handle the case appropriately.
      setSelectedThread(null)
    }
  }

  return (
    <AdditionalResponsesContext.Provider
      value={{
        selectedThread,
        setSelectedThread,
        handleSuggestionSelect,
        mainScrollRef,
        clearSelectedThread,
      }}>
      {children}
    </AdditionalResponsesContext.Provider>
  )
}
