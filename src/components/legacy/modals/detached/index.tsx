import React, {useState, useRef, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';
import {useTheme} from 'styled-components/native';
import {addAction} from '../../../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {showNotification} from '../../../../store/notifications';
import {Icon} from '../../response/response.style.tsx';
import {
  addActivityAndUpdateLoads,
  convertActionToActivity,
  generateGraphData,
  generateGraphDataAsync,
  startLoadingGraphData,
} from '../../../../store/training';
import TSSGraph from '../../graphs/tssGraph';
import LoadGraph from '../../graphs/loadGraph';
import LoadingIndicator from '../../loading';
import {useTimeSelector} from '../../../../contexts/TimeSelectorContext.tsx';

const DetachedModal = ({isVisible, onClose, content}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch(); // Step 3: Use useDispatch
  console.log('content', content);
  const pan = useRef(new Animated.ValueXY()).current; // Add this line for the draggable feature
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [viewImpact, setViewImpact] = useState(false);
  const dropdownHeight = useRef(new Animated.Value(0)).current; // Initial height for the dropdown
  const dropdownWidth = useRef(new Animated.Value(0)).current; // Initial width for the dropdown
  const {
    selectedTime,
    dropdownOptions,
    dropdownVisible,
    selectDropdownOption,
    setDropdownVisible,
    setSelectedTime,
  } = useTimeSelector();

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    if (dropdownVisible) {
      // Collapse the dropdown

      Animated.timing(dropdownWidth, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      // Expand the dropdown

      Animated.timing(dropdownWidth, {
        toValue: 238, // Adjust based on content size
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setDropdownVisible(!dropdownVisible);
  };

  const handleImpactPress = () => {
    setViewImpact(!viewImpact);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dy: pan.y}], {
        useNativeDriver: false, // Make sure this aligns with other animations on `pan`
      }),
      onPanResponderRelease: (e, gesture) => {
        if (gesture.dy > 100) {
          handleClosePress();
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false, // Consistent with the above setting
          }).start();
        }
      },
    }),
  ).current;

  // State for storing graph data
  const [graphData1, setGraphData1] = useState([]);
  const [graphData2, setGraphData2] = useState([]);

  // Fetch the graph data from the Redux store
  // Replace 'selectGraphData1' and 'selectGraphData2' with your actual selectors
  const reduxGraphData1 = useSelector(state => state.training.graphData);
  const reduxGraphData2 = useSelector(state => state.training.graphData2);
  const graphDataLoading = useSelector(
    state => state.training.graphDataLoading,
  );
  useEffect(() => {
    console.log('reduxGraphData1', reduxGraphData1);
    console.log('reduxGraphData2', reduxGraphData2);
    // Set the graph data in the local state
    setGraphData1(reduxGraphData1);
    setGraphData2(reduxGraphData2);
  }, [reduxGraphData1, reduxGraphData2]);

  useEffect(() => {
    console.log('graphData1', graphData1);
    console.log('graphData2', graphData2);
  }, [graphData1, graphData2]);

  useEffect(() => {
    if (isVisible) {
      const activity = convertActionToActivity(content);
      console.log('activity', activity);
      // Now using generateGraphDataAsync thunk instead of generateGraphData
      dispatch(generateGraphDataAsync(activity)); // Pass the activity directly

      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      pan.setValue({x: 0, y: 0}); // Reset pan value when modal is not visible
    }
  }, [isVisible, animatedValue, pan, content, dispatch]);
  const handleAddActionPress = selectedOption => {
    console.log(`Selected option: ${selectedOption}`);
    if (!selectedOption) {
      console.log('No time option selected.');
      return; // Exit the function to prevent further execution
    }

    // Check the type of the content
    if (content.type === 'stat') {
      // If content.type is 'stat', dispatch the addAction
      dispatch(addAction(content, selectedOption));
    } else if (content.type === 'plan') {
      // If content.type is 'plan', convert the action (content) into an activity
      // and perform the rest of the logic
      const activity = convertActionToActivity(content, selectedOption);
      console.log('activity', activity);

      // Dispatch the action to add the activity and potentially update loads
      dispatch(
        addActivityAndUpdateLoads({
          activity, // Pass the activity object
          selectedDate: activity.Date, // Use the date from the activity
          timeOption: selectedOption, // Pass the selected time option
        }),
      );
    }

    // Dispatch a notification to inform the user of the successful addition
    dispatch(
      showNotification({
        message: {
          boldPart: `${content.text} `,
          normalPart: `was added as an action successfully`,
        },
        type: content.category.toLowerCase(), // Convert category to lower case or any format your notification system expects
      }),
    );

    // Close the modal after adding the action
    handleClosePress();
  };

  const handleClosePress = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(onClose);
  };

  const renderDescriptionWithBullets = description => {
    // Check if description is undefined or empty
    if (!description) {
      // Return a message indicating no description is available
      return <Text>No description available.</Text>;
    }

    // Split the description by the bullet point character and filter out empty lines
    const lines = description.startsWith('•')
      ? description.split('•').filter(line => line.trim() !== '')
      : ['•' + description];

    return (
      <View
        style={{
          width: 270,
        }}>
        {lines.map((line, index) => (
          <Text
            key={index}
            style={{
              // Apply paddingTop to all lines except the first
              paddingTop: index === 0 ? 0 : 4,
              fontSize: 15,
            }}>
            {/* Prepend the bullet point back to each line */}
            {`•${line.trim()}`}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={handleClosePress}
        activeOpacity={1}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [
                ...pan.getTranslateTransform(),
                {
                  translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0], // Adjust these values according to your needs
                  }),
                },
              ],
            },
          ]}
          {...panResponder.panHandlers} // Attach the pan handlers to the modal
        >
          <View style={styles.draggableIndicator} />
          {/* Header and rest of your modal content */}
          <View style={styles.header}>
            <View style={styles.actionContainer}>
              <Text style={styles.actions}>
                Add
                <Text
                  style={{
                    color: theme.third,
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  {' '}
                  {content.text}
                </Text>
              </Text>
              <View
                style={{
                  paddingTop: 10,
                }}>
                <View style={styles.rowDescription}>
                  <Icon
                    name="ai"
                    size={18}
                    color={theme.third}
                    marginBottom={2}
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      paddingBottom: 3,
                    }}>
                    Athlea will help you focus on:
                  </Text>
                </View>
                <Text style={{fontSize: 15}}>
                  {renderDescriptionWithBullets(content.description)}
                </Text>
              </View>
            </View>
          </View>

          {viewImpact ? (
            graphDataLoading ? (
              <LoadingIndicator />
            ) : graphData1.length > 0 && graphData2.length > 0 ? (
              <>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 20}}>
                  Training Stress Score
                </Text>
                <TSSGraph widthPercentage={0.6} data={graphData1} />
                <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 20}}>
                  Load
                </Text>
                <LoadGraph widthPercentage={0.6} data={graphData2} />
              </>
            ) : (
              <Text>No data available</Text>
            )
          ) : null}
          <View style={styles.modalContainer}>
            {!dropdownVisible && (
              <TouchableOpacity
                onPress={() => handleImpactPress(content)}
                style={styles.impactButton}>
                <Text style={styles.closeButtonText}>View Impact</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={toggleDropdown}
              style={[
                styles.closeButton,
                dropdownVisible && styles.closeButtonDropdownVisible, // Apply the new style when dropdownVisible is true
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {!dropdownVisible && (
                  <Text style={styles.closeButtonText}>Add Focus</Text>
                )}
                {dropdownVisible && (
                  <Animated.View
                    style={[styles.dropdown, {width: dropdownWidth}]}>
                    <Text style={styles.dropdownLabel}>Time: </Text>
                    {dropdownOptions.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          selectDropdownOption(option);
                          handleAddActionPress(option);
                        }} // Set the onPress to select the option
                        style={styles.dropdownText}>
                        <Text style={styles.dropdownText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </Animated.View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20, // Adjust as needed
    left: 34,
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  rowDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  draggableIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 8,
  },
  modalContent: {
    width: 'auto', // Adjust width as needed
    height: '100%', // Adjust height as needed
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    elevation: 20,
    alignItems: 'center', // Center content horizontally
  },
  header: {
    marginBottom: 30, // Space between header and main image
    textAlign: 'left',
    width: '100%',
    marginTop: 5,
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdown: {
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    color: 'white',
    backgroundColor: '#6200EE',
    paddingVertical: 2.5,
    paddingHorizontal: 3.5,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  dropdownLabel: {
    paddingHorizontal: 6,
    color: 'black',
    marginRight: 6,
    fontSize: 16,
  },
  actionContainer: {
    marginTop: 10,
  },
  actions: {
    fontSize: 18,
    color: '#666',
  },
  mainImage: {
    width: 150, // Adjust size as needed
    height: 150, // Adjust size as needed
    marginBottom: 20, // Space between main image and close button
  },
  closeButton: {
    backgroundColor: '#6200EE', // Example button color
    borderRadius: 10,
    paddingHorizontal: 33,
    height: 42,
    maxWidth: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonDropdownVisible: {
    backgroundColor: 'transparent', // Make the background transparent
    borderColor: '#6200EE', // Keep the border color
    borderWidth: 2, // Add a border
    paddingRight: 44,
    paddingLeft: 10,
  },
  impactButton: {
    backgroundColor: '#5390DF', // Example button color
    paddingVertical: 10,
    paddingHorizontal: 33,
    borderRadius: 10,
    marginRight: 5,
    height: 42,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DetachedModal;
