import {View, Text, TouchableOpacity, FlatList, Animated} from 'react-native'
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Container,
  HeaderContainer,
  SubheaderText,
  ValueDescriptionText,
} from './AddTrainingPlanContent.style'
import {useTheme} from 'styled-components/native'
import GraphPlusTextComponent from '../../dailyLoadContent/component/GraphPlusText'
import useDate from '../../../../../hooks/useDate'
import ActivityComponent from '../../dailyPlanContent/components/ActivityComponent'
import PlanPanel from '../../../panels/planPanel'
import LinearGradient from 'react-native-linear-gradient'
import WeekCard from '../../../weekPanel'
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
  BottomSheetView,
  BottomSheetVirtualizedList,
} from '@gorhom/bottom-sheet'
import {useModal} from '../../../../../contexts/ModalContext'
import MessageModal from '../../../modals/message'
import {useNavigation} from '@react-navigation/native'
import {showNotification} from '../../../../../store/notifications'
import {useDispatch} from 'react-redux'
import WorkoutCard from '../../../weekPanel'
import DescriptionComp from '../../../message/description'
import {Icon} from '../../../response/response.style'
import LoadingText from '../../../loadingText'
import {AuthContext} from '../../../../../utils/authContext.ts'
import {useAppDispatch} from '../../../../../store'
const ActivityData = [
  {date: '2024-01-05', value: 4, phase: 'Transition'},
  {date: '2024-01-06', value: 3, phase: 'Transition'},
  {date: '2024-01-07', value: 2, phase: 'Transition'},
  {date: '2024-01-08', value: 3, phase: 'Transition'},
  {date: '2024-01-09', value: 1, phase: 'Transition'},
  {date: '2024-01-10', value: 4, phase: 'Prep'},
  {date: '2024-01-11', value: 4, phase: 'Prep'},
  {date: '2024-01-12', value: 5, phase: 'Prep'},
  {date: '2024-01-13', value: 2, phase: 'Prep'},
  {date: '2024-01-14', value: 3, phase: 'Prep'},
  {date: '2024-01-15', value: 1, phase: 'Prep'},
  {date: '2024-01-16', value: 5, phase: 'Prep'},
  {date: '2024-01-17', value: 4, phase: 'General'},
  {date: '2024-01-18', value: 5, phase: 'General'},
  {date: '2024-01-19', value: 3, phase: 'General'},
  {date: '2024-01-20', value: 1, phase: 'General'},
  {date: '2024-01-21', value: 2, phase: 'General'},
  {date: '2024-01-22', value: 4, phase: 'General'},
  {date: '2024-01-23', value: 1, phase: 'General'},
  {date: '2024-01-24', value: 3, phase: 'General'},
  {date: '2024-01-25', value: 5, phase: 'General'},
  {date: '2024-01-26', value: 2, phase: 'General'},
  {date: '2024-01-27', value: 1, phase: 'Specific 1'},
  {date: '2024-01-28', value: 1, phase: 'Specific 1'},
  {date: '2024-01-29', value: 1, phase: 'Specific 1'},
  {date: '2024-01-30', value: 1, phase: 'Specific 1'},
  {date: '2024-01-31', value: 1, phase: 'Specific 1'},
  {date: '2024-02-01', value: 1, phase: 'Specific 1'},
  {date: '2024-02-02', value: 1, phase: 'Specific 1'},
  {date: '2024-02-03', value: 1, phase: 'Specific 1'},
  {date: '2024-02-04', value: 1, phase: 'Specific 2'},
  {date: '2024-02-05', value: 1, phase: 'Specific 2'},
  {date: '2024-02-06', value: 1, phase: 'Specific 2'},
  {date: '2024-02-07', value: 1, phase: 'Specific 2'},
  {date: '2024-02-08', value: 1, phase: 'Specific 2'},
  {date: '2024-02-09', value: 1, phase: 'Specific 2'},
  {date: '2024-02-10', value: 1, phase: 'Specific 3'},
  {date: '2024-02-11', value: 1, phase: 'Specific 3'},
  {date: '2024-02-12', value: 1, phase: 'Specific 3'},
]

const TrainingStressScore = [
  {date: '2024-02-28', value: 90, phase: 'Transition'},
  {date: '2024-02-29', value: 90, phase: 'Transition'},
  {date: '2024-03-01', value: 90, phase: 'Transition'},
  {date: '2024-03-02', value: 91, phase: 'Transition'},
  {date: '2024-03-03', value: 92, phase: 'Transition'},
  {date: '2024-03-04', value: 91, phase: 'Transition'},
  {date: '2024-03-05', value: 92, phase: 'Prep'},
  {date: '2024-03-06', value: 120, phase: 'Prep'},
  {date: '2024-03-07', value: 120, phase: 'Prep'},
  {date: '2024-03-08', value: 118, phase: 'Prep'},
  {date: '2024-03-09', value: 117, phase: 'Prep'},
  {date: '2024-03-10', value: 120, phase: 'Prep'},
  {date: '2024-03-11', value: 145, phase: 'Prep'},
  {date: '2024-03-12', value: 146, phase: 'General'},
  {date: '2024-03-13', value: 143, phase: 'General'},
  {date: '2024-03-14', value: 145, phase: 'General'},
  {date: '2024-03-15', value: 142, phase: 'General'},
  {date: '2024-03-16', value: 148, phase: 'General'},
  {date: '2024-03-17', value: 142, phase: 'General'},
  {date: '2024-03-18', value: 140, phase: 'General'},
  {date: '2024-03-19', value: 142, phase: 'General'},
  {date: '2024-03-20', value: 190, phase: 'General'},
  {date: '2024-03-21', value: 192, phase: 'General'},
  {date: '2024-03-22', value: 189, phase: 'Specific 1'},
  {date: '2024-03-23', value: 190, phase: 'Specific 1'},
  {date: '2024-03-24', value: 191, phase: 'Specific 1'},
  {date: '2024-03-25', value: 122, phase: 'Specific 1'},
  {date: '2024-03-26', value: 124, phase: 'Specific 1'},
  {date: '2024-03-27', value: 126, phase: 'Specific 1'},
  {date: '2024-03-28', value: 121, phase: 'Specific 1'},
  {date: '2024-03-29', value: 120, phase: 'Specific 1'},
  {date: '2024-03-30', value: 141, phase: 'Specific 2'},
  {date: '2024-03-31', value: 140, phase: 'Specific 2'},
  {date: '2024-04-01', value: 139, phase: 'Specific 2'},
  {date: '2024-04-02', value: 143, phase: 'Specific 2'},
  {date: '2024-04-03', value: 144, phase: 'Specific 2'},
  {date: '2024-04-04', value: 146, phase: 'Specific 2'},
  {date: '2024-04-05', value: 91, phase: 'Specific 3'},
  {date: '2024-04-06', value: 92, phase: 'Specific 3'},
  {date: '2024-04-07', value: 90, phase: 'Specific 3'},
]

const DailyActivityLoad = [
  {date: '2024-01-05', value: 4.54, phase: 'Transition'},
  {date: '2024-01-06', value: 3.25, phase: 'Transition'},
  {date: '2024-01-07', value: 2.52, phase: 'Transition'},
  {date: '2024-01-08', value: 3.45, phase: 'Transition'},
  {date: '2024-01-09', value: 1.51, phase: 'Transition'},
  {date: '2024-01-10', value: 4.55, phase: 'Prep'},
  {date: '2024-01-11', value: 4.15, phase: 'Prep'},
  {date: '2024-01-12', value: 2.45, phase: 'Prep'},
  {date: '2024-01-13', value: 3.25, phase: 'Prep'},
  {date: '2024-01-14', value: 1.55, phase: 'Prep'},
  {date: '2024-01-15', value: 2.15, phase: 'Prep'},
  {date: '2024-01-16', value: 4.45, phase: 'Prep'},
  {date: '2024-01-17', value: 2.55, phase: 'General'},
  {date: '2024-01-18', value: 1.35, phase: 'General'},
  {date: '2024-01-19', value: 3.25, phase: 'General'},
  {date: '2024-01-20', value: 4.15, phase: 'General'},
  {date: '2024-01-21', value: 1.55, phase: 'General'},
  {date: '2024-01-22', value: 3.35, phase: 'General'},
  {date: '2024-01-23', value: 2.45, phase: 'General'},
  {date: '2024-01-24', value: 4.05, phase: 'General'},
  {date: '2024-01-25', value: 5.0, phase: 'General'},
  {date: '2024-01-26', value: 2.25, phase: 'General'},
  {date: '2024-01-27', value: 1.05, phase: 'Specific 1'},
  {date: '2024-01-28', value: 2.25, phase: 'Specific 1'},
  {date: '2024-01-29', value: 4.35, phase: 'Specific 1'},
  {date: '2024-01-30', value: 3.15, phase: 'Specific 1'},
  {date: '2024-01-31', value: 1.55, phase: 'Specific 1'},
  {date: '2024-02-01', value: 3.45, phase: 'Specific 1'},
  {date: '2024-02-02', value: 2.25, phase: 'Specific 1'},
  {date: '2024-02-03', value: 4.15, phase: 'Specific 1'},
  {date: '2024-02-04', value: 2.35, phase: 'Specific 2'},
  {date: '2024-02-05', value: 4.15, phase: 'Specific 2'},
  {date: '2024-02-06', value: 3.25, phase: 'Specific 2'},
  {date: '2024-02-07', value: 1.55, phase: 'Specific 2'},
  {date: '2024-02-08', value: 4.45, phase: 'Specific 2'},
  {date: '2024-02-09', value: 1.45, phase: 'Specific 2'},
  {date: '2024-02-10', value: 4.55, phase: 'Specific 3'},
  {date: '2024-02-11', value: 2.25, phase: 'Specific 3'},
  {date: '2024-02-12', value: 3.25, phase: 'Specific 3'},
]

const weeksData = [
  {
    id: 'Week 1',
    week: 'Transition Phase',
    phase: 'Transition',
    summary:
      'Focus on increasing workout intensity and incorporating speed work. A variety of workouts targeting mental strength, weight loss, strength, and endurance.',
    workouts: [
      {
        day: 'Week 1',
        description:
          'Establish current fitness levels and introduce low-intensity aerobic exercises',
      },
      {
        day: 'Week 2',
        description: 'Increase the volume and intensity of aerobic training',
      },
      {
        day: 'Week 3',
        description: 'Incorporate resistance and plyometric training',
      },
    ],
    message: 'This is a message for week 1',
  },
  {
    id: 'Week 2',
    week: 'Prep Phase',
    phase: 'Prep',
    summary:
      'Focus on increasing workout intensity and incorporating speed work. This weeks plan includes a variety of workouts targeting back, biceps, legs, core, and cardio, with a focus on ramping up intensity and preparing for the event.',
    workouts: [
      {
        day: 'Week 4',
        description:
          'Longer endurance sessions with some high-intensity intervals',
      },
      {
        day: 'Week 5',
        description: 'Recovery-focused activities and light cross-training',
      },
    ],
    message: 'This is a message for week 2',
  },
  {
    id: 'Week 3',
    week: 'General Phase',
    phase: 'General',
    summary:
      'This phase builds on the foundational layer with an emphasis on enhancing overall fitness, increasing workout intensity, and incorporating targeted speed work. The goal is to develop a balanced athlete ready for more specific phase training.',
    workouts: [
      {
        day: 'Week 6',
        description:
          'Introduce more frequent high-intensity interval training sessions',
      },
      {
        day: 'Week 7',
        description:
          'Include threshold workouts to improve aerobic and anaerobic thresholds',
      },
    ],
  },
  {
    id: 'Week 4',
    week: 'Specific 1 Phase',
    phase: 'Specific 1',
    summary:
      'Focus on increasing workout intensity and incorporating speed work.',
    workouts: [
      {
        day: 'Week 8',
        description: 'Workouts become more specific to the athletes discipline',
      },
      {
        day: 'Week 9',
        description: 'Highest volume and intensity week to push limits',
      },
    ],
  },
  {
    id: 'Week 5',
    week: 'Specific 2',
    phase: 'Specific 2',
    summary:
      'Emphasis on recovery and efficiency, with a mix of cross-training.',
    workouts: [
      {
        day: 'Week 10',
        description:
          'Reduce volume but maintain intensity, focus on race-pace efforts',
      },
      {
        day: 'Week 11',
        description:
          'Gradually reduce training load to allow for adaptation and recovery',
      },
    ],
  },
  {
    id: 'Week 6',
    week: 'Week 6',
    phase: 'Specific 3',
    summary: 'Building on previous phases with added resistance training.',
    workouts: [
      {
        day: 'DAY 1',
        description:
          'Test VO2max and other metrics, final adjustments before competition',
      },
    ],
  },
]

const AddTrainingPlanContent = ({
  TrainingPlanHeader,
  TrainingPlanDescription,
  gradientColors,
  data,
  bottomSheetRef,
  snapPoints,
  handleSheetChanges,
}) => {
  const theme = useTheme()
  // Keywords for each graph
  const activityKeywords = ['Activity', 'Tracker']
  const tssKeywords = ['Training', 'Stress', 'Score', '(TSS)']
  const dailyLoadKeywords = ['Daily', 'Activity', 'Load']
  const [buttonState, setButtonState] = useState('initial') // 'initial', 'loading', or 'completed'

  // Animated rotation value
  const rotateAnim = useRef(new Animated.Value(0)).current // Initial value

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make the animation last for 1000ms (1 second)
        useNativeDriver: true, // Use native driver for better performance
      }),
    ).start()
  }, [rotateAnim])

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Rotate from 0 to 360 degrees
  })

  // Current date state
  const [currentDate, setCurrentDate] = useState('2024-01-17')
  const currentActivityScore =
    ActivityData.find(item => item.date === currentDate)?.value || 0

  // State for selected score
  const [selectedActivityScore, setSelectedActivityScore] = useState({
    value: currentActivityScore,
    date: currentDate,
  })

  const handleButtonPress = id => {
    setActiveId(id)
    const selectedWeek = weeksData.find(week => week.week === id)
    if (selectedWeek) {
      setShowMessageModal(true)
      setSelectedMessage(selectedWeek.message)
    }
  }

  // State to manage whether to show the message modal
  const [showMessageModal, setShowMessageModal] = useState(false)
  const authContext = useContext(AuthContext)

  // State to store the selected message
  const [selectedMessage, setSelectedMessage] = useState('')

  // Close the message modal
  const handleCloseMessageModal = () => {
    setShowMessageModal(false)
  }

  const [showContent, setShowContent] = useState(false)

  // Find the current scores for each dataset

  const currentTssScore =
    TrainingStressScore.find(item => item.date === currentDate)?.value || 0

  const [selectedTssScore, setSelectedTssScore] = useState({
    value: currentTssScore,
    date: currentDate,
  })

  // Update the selected score
  useEffect(() => {
    setSelectedActivityScore({value: currentActivityScore, date: currentDate})
  }, [currentActivityScore, currentDate])

  useEffect(() => {
    setSelectedTssScore({value: currentTssScore, date: currentDate})
  }, [currentTssScore, currentDate])

  // Callback for when a bar is selected in the graph
  const handleActivityScoreSelect = (value, date) => {
    setSelectedActivityScore({value, date})
  }

  const handleTssScoreSelect = (value, date) => {
    setSelectedTssScore({value, date})
  }

  const currentDailyLoadScore =
    DailyActivityLoad.find(item => item.date === currentDate)?.value || 0

  const [selectedDailyLoadScore, setSelectedDailyLoadScore] = useState({
    value: currentDailyLoadScore,
    date: currentDate,
  })

  useEffect(() => {
    setSelectedDailyLoadScore({
      value: currentDailyLoadScore,
      date: currentDate,
    })
  }, [currentDailyLoadScore, currentDate])

  const handleDailyLoadScoreSelect = (value, date) => {
    setSelectedDailyLoadScore({
      value: value,
      date: date,
    })
  }

  const [activeId, setActiveId] = useState(null)
  const [isSuggestionVisible, setIsSuggestionVisible] = useState(false)

  const Date = useDate(currentDate)
  const dispatch = useAppDispatch()

  const {isVisible, showModal, hideModal} = useModal() // Access the modal context
  const navigation = useNavigation()

  const handleAddPlan = () => {
    setButtonState('loading') // Switch to loading state
    authContext.dispatch('registered')
    navigation.navigate('Home')
    setTimeout(() => {
      // After a 3-second delay, navigate and run additional actions
      dispatch(
        showNotification({
          message: {
            boldPart: `${TrainingPlanHeader}`,
            normalPart: ' was successfully added.',
          },
          type: 'custom', // Ensure this type is handled in your notification system
        }),
      )
      setButtonState('initial') // Optionally reset button state or set to 'completed'
    }, 3000) // 3-second delay
  }

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80, // Adjust this value as needed
  }

  const [viewableWeeks, setViewableWeeks] = useState([])

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    const viewableIds = viewableItems.map(item => item.item.id)
    setViewableWeeks(viewableIds) // Update the state with currently viewable item IDs
  }, [])

  // Function to convert value to hours and minutes for display

  const renderWeekCard = ({item}) => {
    const isCurrentItemViewable = viewableWeeks.includes(item.id) // Check if the current item's ID is in the list of viewable IDs

    return (
      <View style={{paddingTop: 15}}>
        <View style={{paddingHorizontal: 20}}>
          <WorkoutCard
            week={item.week}
            workouts={item.workouts}
            phase={item.phase}
            data={data}
            id={item.id}
            onMessagePress={handleButtonPress}
            showMessageModal={showMessageModal}
            hideModal={hideModal}
            summary={item.summary}
            showSuggestion={isCurrentItemViewable} // Pass true if the current card's ID is viewable
          />
        </View>
      </View>
    )
  }

  const keyExtractor = (item, index) => `week-${index}`

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        enableContentPanningGesture={false}
        handleComponent={null}>
        <BottomSheetVirtualizedList
          data={weeksData}
          renderItem={renderWeekCard}
          keyExtractor={(item, index) => `week-${index}`}
          getItem={(data, index) => data[index]}
          getItemCount={data => data.length}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          ListHeaderComponent={
            <>
              <LinearGradient
                colors={[gradientColors[0], gradientColors[1]]} // Ensure it's an array
                style={{
                  padding: 10,
                  borderBottomLeftRadius: 3,
                  borderBottomRightRadius: 3,
                  height: 310,
                }}>
                <HeaderContainer>
                  <ValueDescriptionText>{Date}</ValueDescriptionText>

                  <SubheaderText>{TrainingPlanHeader}</SubheaderText>
                  <TouchableOpacity
                    style={{
                      width: 120, // Fixed width
                      height: 40, // Fixed height
                      backgroundColor: 'white',
                      borderRadius: 20,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center', // Center content
                      position: 'relative', // Needed for absolute positioning of children
                    }}
                    onPress={handleAddPlan}
                    disabled={buttonState === 'loading'}>
                    <View
                      style={{
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                      }}>
                      {buttonState === 'initial' && (
                        <Text
                          style={{
                            color: 'black',
                            opacity: buttonState === 'initial' ? 1 : 0,
                          }}>
                          Add Plan
                        </Text>
                      )}
                      {buttonState === 'loading' && (
                        <Animated.View
                          style={{
                            opacity: buttonState === 'loading' ? 1 : 0, // Only show when loading
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          {/* Assuming LoadingText is your loading animation component */}
                          <LoadingText />
                        </Animated.View>
                      )}
                    </View>
                  </TouchableOpacity>
                </HeaderContainer>
              </LinearGradient>
              <View
                style={{
                  paddingLeft: 20,
                  paddingTop: 20,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    fontWeight: 'bold',
                    paddingBottom: 10,
                  }}>
                  Description:
                </Text>
                <DescriptionComp
                  MessageContent={TrainingPlanDescription}
                  animate={true}
                  MessageWidth={91}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    paddingTop: 20,
                    paddingBottom: 10,
                    color: theme.fourth,
                  }}
                  onPress={() => setShowContent(!showContent)}>
                  {showContent ? 'Hide Content' : 'Show Content'}
                </Text>
              </View>
              {showContent && (
                <View
                  style={{
                    alignContent: 'center',
                  }}>
                  {/* <GraphPlusTextComponent
                    data={TrainingStressScore}
                    HeaderText="Training Stress Score"
                    ScoreValue={selectedTssScore.value}
                    selectedScore={selectedTssScore}
                    onScoreSelect={handleTssScoreSelect}
                    ScoreLabelText="TSS"
                    keywords={tssKeywords}
                    currentData={currentDate}
                    padding={0}
                    ShowComment={true}
                    DescriptionText="The Training Stress Score (TSS) graph is a powerful tool for monitoring your workout intensity and overall training load. It measures the physiological stress your body experiences during exercise, providing valuable feedback on the effectiveness of your training sessions."
                  /> */}
                  <ActivityComponent
                    name="enduranceicon"
                    botType="endurance"
                    iconSize={2.5}
                    gradientColors={theme.gradients.endurance.colors}
                    gradientSize={10}
                    showComment={true}
                    ActivityName="Endurance Foundation Series"
                    ActivityCategory="Endurance Training"
                    Duration="3 Months"
                    Field1Text="Objective: This plan is meticulously designed to incrementally build your aerobic base, enhancing your ability to sustain effort over extended periods. •The primary focus is on cycling sessions that progressively increase in duration and intensity, targeting improvements in cardiovascular efficiency, muscular endurance, and metabolic adaptations."
                    Field2Text="Methodology: We'll start with foundational endurance rides primarily in Zone 2 (Z2), which is key to developing a solid aerobic base without overtraining. •As the plan progresses, we'll introduce more structured workouts including tempo rides in Zone 3 (Z3) and occasional threshold intervals in Zone 4 (Z4) to push your aerobic ceiling higher. •Each phase is designed to prepare your body for the increased demands of the next, ensuring a balanced approach to building endurance."
                    Field3Text="Weekly Structure: Each week will feature a mix of long, steady rides, shorter tempo efforts, and recovery sessions. •The long rides will gradually extend in duration, focusing on time spent in Z2 to Z3, while tempo rides will challenge your ability to maintain a higher intensity over shorter periods. •Recovery is paramount; thus, rest days and easy rides are integrated to allow for physical and mental rejuvenation."
                    CommentContent="This endurance training component is the backbone of our 4-month plan. It's built on the principle that endurance is not just about pushing harder, but training smarter. By the end of this journey, you can expect significant improvements in your ability to sustain higher speeds over longer distances, a higher lactate threshold, and enhanced recovery efficiency. Embrace the process, and let's build that endurance foundation together, setting you up for peak performance in your upcoming challenges."
                  />
                  <ActivityComponent
                    name="strengthicon"
                    botType="strength"
                    showComment={true}
                    iconSize={1.75}
                    gradientColors={theme.gradients.strength.colors}
                    gradientSize={10}
                    ActivityName="Strength Training Series"
                    ActivityCategory="Strength Conditioning"
                    Duration="3 Months"
                    Field1Text="Objective: • The strength component of our training plan is designed to improve overall muscular strength and power, essential for enhancing performance and injury prevention. • Focusing on compound movements and core stability, this series aims to develop a solid strength foundation applicable across all endurance disciplines."
                    Field2Text="Methodology: • Our approach combines traditional strength training with functional exercises to target the major muscle groups used in endurance sports. • Early phases focus on building a base of muscular endurance, with workouts gradually progressing in intensity and complexity. • Expect a variety of exercises, from bodyweight routines to weightlifting, ensuring comprehensive muscle engagement."
                    Field3Text="Weekly Structure: • You'll engage in strength training sessions 2-3 times per week, designed to complement your endurance workouts without causing overtraining. • Each session will include a warm-up, main set, and cool-down, focusing on different muscle groups to promote balanced development and recovery. • As the plan progresses, we'll introduce plyometric and high-intensity circuit training to further boost muscular power and efficiency."
                    CommentContent="Integrating strength training into your endurance plan is crucial for building a resilient, powerful physique capable of tackling any challenge. This 4-month journey will not only augment your muscular strength and endurance but also improve your posture, balance, and injury resistance. Embrace each session with dedication, and witness the transformation in your performance and overall physical health. Let's build strength that endures."
                  />
                  <ActivityComponent
                    name="nutritionicon"
                    botType="nutrition"
                    showComment={true}
                    iconSize={2.5}
                    gradientColors={theme.gradients.nutrition.colors}
                    gradientSize={10}
                    ActivityName="Nutrition Optimization Series"
                    ActivityCategory="Nutrition Planning"
                    Duration="3 Months"
                    Field1Text="Objective: • Tailored to support the demands of endurance and strength training. • Optimizes fuel intake for performance and recovery. • Ensures a balanced intake of macronutrients and micronutrients."
                    Field2Text="Methodology: • Structured around whole, nutrient-dense foods. • Emphasizes the balance of carbohydrates, proteins, and fats. • Adjusts nutrition based on training intensity and phase. • Incorporates hydration strategies and nutrient timing."
                    Field3Text="Weekly Guidance: • Provides guidelines and meal suggestions aligning with your training. • Includes fueling strategies for pre and post-workout. • Offers daily meal planning for optimal fueling. • Addresses nutrition management on rest days."
                    CommentContent="Nutrition is foundational for training success, acting as fuel and recovery. This journey teaches you what, when, and why to eat. • Empowers you with knowledge for informed nutrition choices. Elevates performance through optimized nutrition."
                  />

                  <ActivityComponent
                    name="recoveryicon"
                    botType="recovery"
                    showComment={true}
                    iconSize={2.5}
                    gradientColors={theme.gradients.recovery.colors}
                    gradientSize={10}
                    ActivityName="Recovery Series"
                    ActivityCategory="Recovery Management"
                    Duration="3 Months"
                    Field1Text="Objective: • Central to training philosophy. • Designed to maximize recovery and return strength. • Focuses on active recovery, mobility, and rest strategies. • Aims to enhance resilience and adaptability."
                    Field2Text="Methodology: • Combines dynamic stretching, foam rolling, yoga, and mobility exercises. • Improves circulation, muscle recovery, and flexibility. • Incorporates strategic rest days and lighter sessions. • Ensures a holistic approach to well-being."
                    Field3Text="Weekly Structure: • Integrates recovery activities and daily mobility routines. • Focuses on post-intense session recovery. • Guides on sleep optimization, stress management, and nutrition for recovery. • Provides a comprehensive recovery framework."
                    CommentContent="Recovery is a vital part of athletic development. Emphasizes the importance of listening to your body. This journey fosters peak performance and sport longevity. Builds resilience beyond the physical, balancing training and life."
                  />
                </View>
              )}
            </>
          }
        />
      </BottomSheet>
      {showMessageModal && <MessageModal content={selectedMessage} />}
    </>
  )
}

export default AddTrainingPlanContent
