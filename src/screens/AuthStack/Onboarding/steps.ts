
export const steps = [
  {
    id: 'welcome',
    text: 'Welcome to Athlea!',
    condition: (index, group) => index >= 0 && group === 1,
    groupIndex: 1,
  },
  {
    id: 'questionsIntro',
    text:
      'I’m going to ask you five questions about yourself so I can better understand you.',
    condition: (index, group) => index >= 1 && group === 1,
    groupIndex: 1,
  },
  {
    id: 'letsGetStarted',
    text: 'Let’s get started!',
    condition: (index, group) => index >= 2 && group === 1,
    groupIndex: 1,
  },
  {
    id: 'nameQuestion',
    text: 'Whats your name or nickname that you want me to call you?',
    condition: (index, group) => index >= 3 && group === 1,
    groupIndex: 1,
  },
]
