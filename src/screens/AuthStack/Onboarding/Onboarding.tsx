import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
  ScrollView,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native'
import {IconButton} from 'components/legacy/iconButton' // Original IconButton// Aliased MicIconButton
import {useTheme} from 'styled-components/native'
import {useNavigation} from '@react-navigation/native'
import {
  ButtonContainer,
  CheckIcon,
  Container,
  HeaderContainer,
  Input,
  MicIcon,
  MicIconButton,
  Subtext,
} from './Onboarding.style'
import CommentComp from 'components/legacy/message/comment'
import {set} from 'date-fns'
import GenderButton from 'components/legacy/onboarding/genderButton'
import {
  AgeSlider,
  HeightSlider,
  WeightSlider,
} from 'components/legacy/sliders/AgeSlider'
import TagSelector from 'components/legacy/selectors/TagSelector'
import OnboardingLoader from 'components/legacy/onboardingLoader'
import {TrainingPlans} from 'components/legacy/content/addTrainingPlanContent'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import AddTrainingPlanContent from 'components/legacy/content/addTrainingPlanContent/components/AddTrainingPlanContent'
import BluetoothSelectionComp from 'components/legacy/bluetoothSelector'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'


export const Onboarding = () => {
  const theme = useTheme()
  const navigation = useNavigation()
  const scrollViewRef = useRef()

  // State to track the current comment index
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0)
  const [text, setText] = React.useState('')
  const [name, setName] = useState('') // State to store the input value
  const [enter, setEnter] = useState(false)
  const [offsets, setOffsets] = useState({}) // Store the offsets
  const [selectedGender, setSelectedGender] = useState(null)
  const [skip, setSkip] = useState(false)
  const [done, setDone] = useState(false)
  const [age, setAge] = useState(null)
  const [weight, setWeight] = useState(null)
  const [height, setHeight] = useState(null)
  const [selectedTags, setSelectedTags] = useState([])
  const [currentGroupIndex, setCurrentGroupIndex] = useState(1)
  const [selectedWatches, setSelectedWatches] = useState([])

  const updateUserProfile = async updates => {
    try {
      const userId = auth().currentUser?.uid
      if (!userId) {throw new Error('User is not logged in')}
      console.log('userId:', userId)
      await firestore()
        .collection('users')
        .doc(userId)
        .set(updates, {merge: true})
      console.log('User profile updated in Firestore:', updates)
    } catch (error) {
      console.error('Error updating user profile: ', error)
    }
  }
  // Call this function when each CommentComp is laid out
  const handleLayout = index => event => {
    const layout = event.nativeEvent.layout
    setOffsets(prevOffsets => {
      const newOffsets = {...prevOffsets}
      newOffsets[index] = layout.y
      return newOffsets
    })
  }

  useEffect(() => {
    // Handle the setting of skip based on currentCommentIndex
    const skipIndices = [4, 7, 10, 13, 16, 19, 22, 26]
    const shouldSkip = skipIndices.includes(currentCommentIndex)
    setSkip(shouldSkip && !done) // Only set 'skip' to true if 'done' is false

    // Special case for automatically scrolling to the end at index 20
    if (currentCommentIndex === 20) {
      scrollViewRef.current?.scrollToEnd({animated: true})
    }
    // Logic for 'done' state based on the current onboarding step
    if (currentCommentIndex === 4) {
      const hasName = name.trim() !== ''
      setDone(hasName)
      setEnter(hasName)
      if (hasName) {
        setSkip(false) // Ensure 'skip' is false when 'done' is true
      }
    } else if (currentCommentIndex === 7 && selectedGender !== null) {
      setDone(true)
      setSkip(false) // Ensure 'skip' is false when 'done' is true for gender selection
    } else if (currentCommentIndex === 10 && age !== null) {
      setDone(true)
    } else if (currentCommentIndex === 13 && weight !== null) {
      setDone(true)
    } else if (currentCommentIndex === 16 && height !== null) {
      setDone(true)
    } else if (currentCommentIndex === 19 && selectedTags.length > 0) {
      setDone(true)
    } else if (currentCommentIndex === 22 && selectedWatches.length > 0) {
      setDone(true)
    } else if (currentCommentIndex === 26) {
      // Example logic for the final step
      setIsBottomSheetVisible(true)
    } else {
      console.log('currentCommentIndex:', currentCommentIndex)
    }
  }, [currentCommentIndex, name, selectedWatches, selectedGender, done])

  const onboardingSteps = [
    // Group 1: Introduction
    {
      id: 'welcome',
      message: 'Welcome to Athlea!',
      condition: (index, group) => index >= 0 && group === 1,
      groupIndex: 1,
    },
    {
      id: 'questionsIntro',
      message:
        'I’m going to ask you five questions about yourself so I can better understand you.',
      condition: (index, group) => index >= 1 && group === 1,
      groupIndex: 1,
    },
    {
      id: 'letsGetStarted',
      message: 'Let’s get started!',
      condition: (index, group) => index >= 2 && group === 1,
      groupIndex: 1,
    },
    {
      id: 'nameQuestion',
      message: 'Whats your name or nickname that you want me to call you?',
      condition: (index, group) => index >= 3 && group === 1,
      groupIndex: 1,
    },
    {
      id: 'nameInput',
      condition: (index, group) => index >= 4 && group === 1,
      render: () => (
        <View style={{marginBottom: 20}}>
          <Input onChangeText={setName} value={name} placeholder="type here" />
          {!enter ? (
            <MicIconButton backgroundColor="transparent">
              <CheckIcon name="ok" size={18} disable />
            </MicIconButton>
          ) : (
            <MicIconButton backgroundColor="transparent">
              <CheckIcon name="ok" size={18} />
            </MicIconButton>
          )}
        </View>
      ),
    },
    // Assuming after entering the name, you transition to the next group
    {
      id: 'nameInput',
      condition: (index, group) => index >= 5 && group === 1,
      render: () => (
        <CommentComp
          MessageContent={`Nice to meet you ${text}!`}
          TimeTextContent="Now"
          speed={5}
          showIcons={false}
          marginBottom={30}
        />
      ),
    },
    // Group 2: Gender Selection
    {
      id: 'genderQuestion',
      message: 'How do you prefer to be identified in terms of gender?',
      condition: (index, group) => index >= 6 && group === 2,
    },
    {
      id: 'genderSelection',
      condition: (index, group) => index >= 7 && group === 2,
      render: () => (
        <View style={{paddingBottom: 20}}>
          <GenderButton
            onPress={selectedGenderValue => {
              setSelectedGender(selectedGenderValue)
            }}
            selectedGender={selectedGender}
          />
        </View>
      ),
    },
    {
      id: 'genderSelected',
      message: 'Thanks!',
      condition: (index, group) => index >= 8 && group === 2,
    },
    // Group 3: Age Information
    {
      id: 'shareAge',
      message:
        'Next, for further customization of our model and to enhance your experience, could you share your age with me?',
      condition: (index, group) => index >= 9 && group === 3,
      groupIndex: 3,
    },
    {
      id: 'ageSlider',
      condition: (index, group) => index >= 10 && group === 3,
      render: () => (
        <>
          <Subtext>* Real age can quickly help us specialize your team</Subtext>
          <AgeSlider
            age={age}
            setAge={newAge => handleChange(setAge, newAge)}
          />
        </>
      ),
    },
    {
      id: 'ageShared',
      message: 'Thank you!',
      condition: (index, group) => index >= 11 && group === 3,
    },
    {
      id: 'knowYourWeightQuestion',
      message: 'Next, I would like to know your weight?',
      condition: (index, group) => index >= 12 && group === 4,
      groupIndex: 4,
    },
    {
      id: 'knowYourWeight',
      condition: (index, group) => index >= 13 && group === 4,
      render: () => (
        <>
          <Subtext>
            * Real weight can quickly help us specialize your team
          </Subtext>
          <WeightSlider
            weight={weight}
            setWeight={(newWeight: number) =>
              handleChange(setWeight, newWeight)
            }
          />
        </>
      ),
    },
    {
      id: 'knowYourWeight',
      message: 'Thank you!',
      condition: (index, group) => index >= 14 && group === 4,
    },
    {
      id: 'knowYourHeightQuestion',
      message: 'Lastly, I would like to know your height?',
      condition: (index, group) => index >= 15 && group === 4,
      groupIndex: 4,
    },
    {
      id: 'knowYourHeight',
      condition: (index, group) => index >= 16 && group === 4,
      render: () => (
        <>
          <Subtext>
            * Real height can quickly help us specialize your team
          </Subtext>
          <HeightSlider
            height={height}
            setHeight={(newHeight: number) =>
              handleChange(setHeight, newHeight)
            }
          />
        </>
      ),
    },
    {
      id: 'knowYourHeight',
      message: 'Thank you!',
      condition: (index, group) => index >= 17 && group === 4,
    },
    // Group 5: Goals and Achievements
    {
      id: 'goalsToAchieve',
      message:
        'I would like to know your goals and what you are looking to achieve?',
      condition: (index, group) => index >= 18 && group === 5,
      groupIndex: 5,
    },
    {
      id: 'goalsSelector',
      condition: (index, group) => index >= 19 && group === 5,
      render: () => (
        <>
          <Subtext>
            * The more descriptors you select the better we’ll be able to
            specialize a plan for you
          </Subtext>
          <TagSelector
            selectedTags={selectedTags}
            setSelectedTags={(newTags: string[]) =>
              handleChange(setSelectedTags, newTags)
            }
          />
        </>
      ),
    },
    {
      id: 'goalsSelected',
      message: 'Thank you!',
      condition: (index, group) => index >= 20 && group === 5,
    },
    // Group 6: Device Connection
    {
      id: 'connectDevices',
      message:
        'Lastly, would you want to connect any devices or upload data to the platform?',
      condition: (index, group) => index >= 21 && group === 6,
      groupIndex: 6,
    },
    {
      id: 'deviceSelector',
      condition: (index, group) => index >= 22 && group === 6,
      render: () => (
        <BluetoothSelectionComp
          selectedWatches={selectedWatches}
          setSelectedWatches={setSelectedWatches}
          customImageSize={{width: 100, height: 94}} // Your custom size here
          updateUserProfile={updateUserProfile}
        />
      ),
    },
    {
      id: 'deviceSelected',
      message: `Thank You! Your selected devices: ${selectedWatches
        .map(watch => watch.name)
        .join(', ')} are now connected.`,
      condition: (index, group) => index >= 23 && group === 6,
    },
    {
      id: 'finalization',
      message:
        'Thank you for providing all the necessary details! We\'re all set to tailor your interface for the best possible experience. Let\'s get started on optimizing your journey to peak performance.',
      condition: (index, group) => index >= 24 && group === 7,
      groupIndex: 7,
    },
    {
      id: 'loading',
      condition: (index, group) => index >= 25 && group === 7,
      render: () => <OnboardingLoader />,
    },
  ]

  const handleChange = (setState, newValue) => {
    setState(newValue) // Set the new state value using the setState function passed
    setSkip(false) // Set skip to false
    setDone(true) // Set done to true
  }

  // Function to handle tap and render the next comment
  const handleTap = () => {
    if (currentCommentIndex === 19) {
      // You can check for additional conditions here, such as if certain tags are selected or not
      // For example, if (!tagsSelected) return;
      scrollViewRef.current.scrollToEnd({animated: true})
      return // Early return to prevent advancing to the next index
    }
    const newIndex = currentCommentIndex + 1
    setCurrentCommentIndex(newIndex)

    // Determine if it's time to switch to the next group
    if (
      (newIndex > 5 && currentGroupIndex === 1) ||
      (newIndex > 8 && currentGroupIndex === 2) ||
      (newIndex > 11 && currentGroupIndex === 3) ||
      (newIndex > 17 && currentGroupIndex === 4) ||
      (newIndex > 20 && currentGroupIndex === 5) ||
      (newIndex > 23 && currentGroupIndex === 6) ||
      (newIndex > 25 && currentGroupIndex === 7)
    ) {
      // End of group 2
      setCurrentGroupIndex(currentGroupIndex + 1) // Move to the next group
    }
  }

  const handleDonePress = () => {
    // Check if we're on the gender selection step
    if (currentCommentIndex === 4) {
      setCurrentCommentIndex(5) // Move to index 6 after the name has been set
      setText(name) // Update the text with the name entered
      updateUserProfile({nickname: name})
    } else if (selectedGender !== null && currentCommentIndex === 7) {
      updateUserProfile({gender: selectedGender})
      setCurrentCommentIndex(8) // If gender has been selected, proceed to the next step
    } else if (currentCommentIndex === 10) {
      // We assume that reaching index 10 means the user has interacted with the AgeSlider
      setCurrentCommentIndex(11) // Move to index 11 after the age has been set
      updateUserProfile({age: age})
    } else if (currentCommentIndex === 13) {
      // We assume that reaching index 13 means the user has interacted with the WeightSlider
      setCurrentCommentIndex(14) // Move to index 14 after the weight has been set
      updateUserProfile({weight: weight})
    } else if (currentCommentIndex === 16) {
      // We assume that reaching index 16 means the user has interacted with the HeightSlider
      setCurrentCommentIndex(17) // Move to index 17 after the height has been set
      updateUserProfile({height: height})
    } else if (currentCommentIndex === 19) {
      // We assume that reaching index 19 means the user has interacted with the TagSelector
      setCurrentCommentIndex(20) // Move to index 20 after the tags have been set
      updateUserProfile({tags: selectedTags})
    } else if (currentCommentIndex === 22) {
      // We assume that reaching index 22 means the user has interacted with the BluetoothSelectionComp
      setCurrentCommentIndex(23) // Move to index 23 after the device has been set
      updateUserProfile({devices: selectedWatches})
    }

    // Reset done and skip to prepare for the next steps
    setSkip(false)
    setDone(false)
    Keyboard.dismiss() // Hide the keyboard
  }

  const [selectedPlanTitle, setSelectedPlanTitle] = useState({
    title: '',
    description: '',
  })

  const bottomSheetRef = React.useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['100%'], [])
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setIsBottomSheetVisible(false)
    }
  }, [])

  const [isBottomSheetVisible, setIsBottomSheetVisible] = React.useState(false)

  const gradientColors = ['#6a11cb', '#2575fc'] // Choose your specific colors

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <HeaderContainer>
          <IconButton
            type="right-open-mini"
            size={18}
            backgroundColor="#ffffffff"
            borderColor={theme.primaryscale[4]}
            onPress={() => navigation.navigate('Home')}
          />
        </HeaderContainer>
        {/* Wrap the View with TouchableOpacity to detect taps */}

        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={1} // Keep it fully opaque on tap
          onPress={handleTap} // Handle tap to render next comment
        >
          <ScrollView
            style={{flex: 1, paddingHorizontal: 20}}
            ref={scrollViewRef}
            // Add contentContainerStyle if needed
            contentContainerStyle={{flexGrow: 1}}>
            {onboardingSteps.map(
              ({id, condition, message, render, marginBottom = 20}) =>
                condition(currentCommentIndex, currentGroupIndex) &&
                (render ? (
                  render()
                ) : (
                  <CommentComp
                    key={id}
                    MessageContent={message} /* other props */
                    TimeTextContent="Now"
                    speed={5}
                    showIcons={false}
                    marginBottom={marginBottom}
                  />
                )),
            )}
          </ScrollView>
        </TouchableOpacity>
      </SafeAreaView>
      <ButtonContainer>
        {skip && (
          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        )}
        {done && (
          <TouchableOpacity style={styles.doneButton} onPress={handleDonePress}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        )}
      </ButtonContainer>
      {isBottomSheetVisible && (
        <AddTrainingPlanContent
          TrainingPlanHeader={TrainingPlans[0].title}
          TrainingPlanDescription={TrainingPlans[0].description}
          gradientColors={gradientColors}
          data={TrainingPlans[0].data}
          snapPoints={snapPoints}
          bottomSheetRef={bottomSheetRef}
          handleSheetChanges={handleSheetChanges}
        />
      )}
    </>
  )
}

// Add styles for the TextInput
const styles = StyleSheet.create({
  input: {
    height: 60,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderWidth: 0, // No border
    borderBottomWidth: 1, // Bottom border
    borderColor: 'black', // Bottom border color
    fontSize: 16,
    width: '95%',
  },
  skipButton: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    height: 60,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.89,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  doneButton: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    height: 60,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 100,
    width: Dimensions.get('window').width * 0.88,
  },
  skipButtonText: {
    color: 'black',
    fontSize: 16,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
  },
  subtext: {
    fontSize: 13,
    color: '#7F7F7F',
    fontWeight: 'light',
    paddingBottom: 10,
  },
})

export default Onboarding
