import axios from 'axios'

export const updatedPlanName = async (messages: string) => {
  if (!messages) {
    console.error('No messages provided for generating suggestions.')
    return null
  }

  try {
    console.log('Generating suggestion for:', messages)

    const response = await axios.post('/api/openai', { prompt: messages })

    console.log('Response data:', response.data)

    if (
      response.data &&
      Array.isArray(response.data.suggestions) &&
      response.data.suggestions.length > 0 &&
      response.data.suggestions[0].suggestion_text
    ) {
      console.log(
        'Suggestion generated:',
        response.data.suggestions[0].suggestion_text,
      )
      return response.data.suggestions[0].suggestion_text
    } else {
      console.error('Invalid suggestion format received:', response.data)
      return null
    }
  } catch (error) {
    console.error('Error generating suggestion:', error)
    if (axios.isAxiosError(error) && error.response) {
      console.error('Response data:', error.response.data)
    }
    return null
  }
}
