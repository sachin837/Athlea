import {useCallback, useEffect, useState} from 'react'
import {InputTypes, useChatLayout} from '../../../layouts'
import {steps} from './steps'
import {Message} from '../../../model/chat'


export const useOnboarding = () => {

  const chatLayoutProps = useChatLayout()

  const [currentStep, setCurrentStep] = useState<number>(0)
  const [username, setUsername] = useState('')

  useEffect(() => {
    setTimeout(() => addTutorialMessage(0), 1000)
    setTimeout(() => addTutorialMessage(1), 2000)
    setTimeout(() => addTutorialMessage(2), 3000)
    setTimeout(() => addTutorialMessage(3), 4000)
  }, [])

  const addTutorialMessage = useCallback((step: number) => {
    chatLayoutProps.addAthleaMessage(steps[step])
    setCurrentStep(step)
  }, [])

  const onUserInput = useCallback((messages?: Message[]) => {
    chatLayoutProps.onSend(messages)
    if (currentStep === 3 && messages[0]) {
      setUsername(messages[0].text)
    }
    // chatLayoutProps.setInputType(InputTypes.confirm)
  }, [currentStep])

  return {
    chatLayoutProps,
    onUserInput,
  }
}
