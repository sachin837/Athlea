import React, {useEffect, useState} from 'react'
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {useTheme} from 'styled-components/native'
import {bodyMap} from '../../../../screens/TrainingPlan/TrainingPlan'
import {widthPercentageToDP} from '../../../../../utils/deviceOrientationHook'
import ActionsComp from '../../../message/actions'
import AdviceModal from '../../../modals/advice'
import {Container} from '../dailyPlan.style'
import {
  AiIcon,
  BodyContainer,
  MessageIcon,
  PanelContainer,
} from './ActivityComponent.style'
import {useDispatch, useSelector} from 'react-redux'
import Training, {
  completeActivity,
  completeActivityById,
  markActivityAsCompleted,
  startLoading,
  unmarkActivityAsCompleted,
} from '../../../../../store/training'
import MessageModal from '../../../modals/message'
import TrainingMessageModal from '../../../modals/training'

const ActivityPanelComponent = ({
  name,
  iconSize,
  gradientColors,
  ActivityName,
  Duration,
  activities, // Accept the activities array
  ShowDuration = true,
  BodyPart,
  selectedDate,
  setActivities,
  openBottomSheet,
  foundPanelCategory,
  isCategoryLoaded,
  selectedCategory: selectedCategoryProp,
}) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false)
  const [messageModalContent, setMessageModalContent] = useState('')

  const phaseColorMapping = {
    'All Categories': '#F94A8C',
    Strength: '#6580F4',
    Endurance: '#37C6C4',
    Recovery: '#D343DB',
    Nutrition: '#63D571',
    Wellbeing: '#FD8C5B',
  }
  const completedActivities = useSelector(
    state => state.training.completedActivities,
  )

  console.log('Category activities array:', activities)

  const [animations, setAnimations] = useState([])
  const [expandedActivity, setExpandedActivity] = useState(null)

  // useEffect(() => {
  //   // Set up an animated value for each activity that should animate
  //   setAnimations(
  //     activities.map(
  //       activity => new Animated.Value(activity.shouldAnimate ? 0 : 1), // Start from 0 if should animate, else 1
  //     ),
  //   );
  // }, [activities]);

  // useEffect(() => {
  //   const animationsToRun = animations
  //     .map((anim, index) => {
  //       // Check if the activity has already been animated
  //       if (!animatedActivities.has(activities[index].id)) {
  //         return Animated.timing(anim, {
  //           toValue: 1, // Animate to fully visible
  //           duration: 400, // Duration of the animation
  //           useNativeDriver: false,
  //           delay: 100, // Optional: add delay based on index to stagger the animations
  //         });
  //       }
  //     })
  //     .filter(Boolean); // Filter out undefined values (activities that are already animated)

  //   if (animationsToRun.length > 0) {
  //     Animated.parallel(animationsToRun).start(() => {
  //       // Mark activities as animated
  //       const newAnimatedActivities = new Set(animatedActivities);
  //       activities.forEach(activity => newAnimatedActivities.add(activity.id));
  //       setAnimatedActivities(newAnimatedActivities);
  //     });
  //   }
  // }, [activities, animations, animatedActivities]);

  const getPanelComponentStyle = activityId => ({
    justifyContent: expandedActivity === activityId ? 'flex-start' : 'center',
  })

  const messagesByCategory = {
    Strength:
      'Great job! Strength training helps to build muscle and strength. How much weight are you lifting?',
    Endurance: 'Endurance activities increase your breathing and heart rate.',
    Recovery: 'Proper recovery can help you to avoid stress and injury.',
    Nutrition:
      'Good nutrition is crucial for health, especially when you\'re exercising.',
    Wellbeing:
      'Well-being is the experience of health, happiness, and prosperity.',
  }

  const isLoading = useSelector(state => state.training.isLoading)
  const selectedCategory = useSelector(
    state => state.training.selectedCategory,
  )

  // Define your showMessageModal function to use isLoading and selectedCategory
  const showMessageModal = () => {
    // This line is just for debugging, remove it if not needed
    console.log(
      'showMessageModal called with isLoading:',
      isLoading,
      'and selectedCategory:',
      selectedCategory,
    )
    if (isLoading) {
      // Handle the loading state, e.g., show a loader or disable buttons
    } else {
      // No longer loading, proceed with showing the modal
      const messageContent =
        messagesByCategory[selectedCategory] || 'Default message'
      setMessageModalContent(messageContent)
      if (!isMessageModalVisible) {
        setIsMessageModalVisible(true)
      }
    }
  }

  const handleCloseModal = () => {
    setIsMessageModalVisible(false) // Directly control the visibility
  }

  const backgroundColor = phaseColorMapping[selectedCategoryProp]

  return (
    <>
      <View>
        <Container>
          <BodyContainer>
            {console.log('Activities array:', activities)}
            {activities.map((activity, index) => (
              <View key={activity.id}>
                <TouchableOpacity onPress={() => openBottomSheet(activity.id)}>
                  <Animated.View
                    style={[
                      styles.panelComponent,
                      getPanelComponentStyle(activity.id),
                      {opacity: animations[index]},
                    ]}>
                    <View style={styles.panelContent}>
                      <PanelContainer>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={
                              bodyMap[activity.BodyPart.replace(/\s+/g, '')]
                            }
                            style={{width: 30, height: 50, marginRight: 12}}
                            resizeMode="contain"
                          />
                          <View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Text style={styles.headerText}>
                                {activity.Header}
                              </Text>
                              <MessageIcon name="comment" />
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              {activity.AiIcon && (
                                // Adjust icon name, size, and color as needed
                                <AiIcon
                                  name="ai"
                                  size={13}
                                  color={theme.third}
                                />
                              )}
                              <ActionsComp
                                MessageContent={activity.ActivityText}
                                size={14}
                              />
                            </View>
                          </View>
                        </View>
                      </PanelContainer>
                      <TouchableOpacity
                        style={[
                          styles.circle,
                          completedActivities.includes(activity.id)
                            ? [
                              styles.completedCircle,
                              {backgroundColor: backgroundColor},
                            ]
                            : styles.uncompletedCircle,
                        ]}
                        onPress={() => {
                          console.log('Circle TouchableOpacity pressed') // For debugging
                          if (!isMessageModalVisible) {
                            showMessageModal()
                          }

                          if (completedActivities.includes(activity.id)) {
                            dispatch(
                              unmarkActivityAsCompleted({
                                activityId: activity.id,
                                date: selectedDate,
                              }),
                            )
                          } else {
                            dispatch(startLoading())
                            dispatch(
                              markActivityAsCompleted({
                                activityId: activity.id,
                              }),
                            )
                            dispatch(
                              completeActivityById({
                                activityId: activity.id,
                                date: selectedDate,
                              }),
                            )
                          }
                        }}>
                        {completedActivities.includes(activity.id) && (
                          <AiIcon
                            name="ok"
                            size={12}
                            color="#FFF"
                            paddingRight={0}
                          /> // Adjust icon name, size, and color as needed
                        )}
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                </TouchableOpacity>
              </View>
            ))}
          </BodyContainer>
        </Container>
        {isMessageModalVisible && (
          <TrainingMessageModal
            isVisible={isMessageModalVisible}
            content={messageModalContent}
            showSelector={true}
            onClose={handleCloseModal}
          />
        )}
      </View>
    </>
  )
}

export default ActivityPanelComponent

const styles = StyleSheet.create({
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedCircle: {
    backgroundColor: '#F94A8C',
    borderWidth: 0.3,
    borderColor: '#ffffff',
  },
  panelComponent: {
    backgroundColor: '#EEEEEE', // Replace with the color from your theme
    borderRadius: 10,
    marginBottom: 10,
  },
  panelContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    width: widthPercentageToDP(90), // Adjust as needed
  },
  uncompletedCircle: {
    backgroundColor: 'transparent',
    borderColor: '#656565',
    borderWidth: 1,
  },
  activityContent: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 5,
  },
  bodyText: {
    fontSize: 14,
    color: 'black',
  },
})
