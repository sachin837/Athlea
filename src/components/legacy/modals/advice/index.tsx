import React, {useState, useRef, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import {useTheme} from 'styled-components/native';
import {PageButton} from '../../pageButton';
import {TouchableOpacity} from 'react-native';

const AdviceModal = ({
  isVisible,
  onClose,
  actions, // Expecting a single object here
}) => {
  const screenHeight = Dimensions.get('window').height;
  const modalY = useRef(new Animated.Value(screenHeight)).current; // Start the modal off-screen
  const theme = useTheme();

  // Handles the animation for closing the modal
  const handleCloseAnimation = () => {
    Animated.timing(modalY, {
      toValue: screenHeight, // Move back to off-screen
      duration: 300,
      useNativeDriver: true,
    }).start(onClose); // Call onClose after the animation completes
  };

  useEffect(() => {
    if (isVisible) {
      Animated.timing(modalY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(modalY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, modalY, screenHeight]);

  // Helper functions for selecting gradient colors and icons based on category
  const gradientSelector = category => {
    switch (category) {
      case 'Endurance':
        return theme.gradients.endurance.colors;
      case 'Strength':
        return theme.gradients.strength.colors;
      case 'Nutrition':
        return theme.gradients.nutrition.colors;
      case 'Recovery':
        return theme.gradients.recovery.colors;
      case 'Wellbeing':
        return theme.gradients.wellbeing.colors;
      default:
        return theme.gradients.endurance.colors;
    }
  };

  const iconSelector = category => {
    switch (category) {
      case 'Endurance':
        return 'enduranceicon';
      case 'Strength':
        return 'strengthicon';
      case 'Nutrition':
        return 'nutritionicon';
      case 'Recovery':
        return 'recoveryicon';
      case 'Wellbeing':
        return 'wellbeingicon';
      default:
        return 'enduranceicon';
    }
  };

  const iconSizeSelector = category => {
    switch (category) {
      case 'Endurance':
      case 'Strength':
      case 'Nutrition':
      case 'Recovery':
      case 'Wellbeing':
        return 2;
      default:
        return 2;
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, {dy: modalY}], // Bind the vertical gesture to the modalY animated value
        {useNativeDriver: false}, // Set to false as we're updating layout properties
      ),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 50) {
          // If dragged down beyond 50 points
          handleCloseAnimation(); // Close the modal
        } else {
          // Return to original position if not dragged enough
          Animated.spring(modalY, {
            toValue: 0,
            tension: 120,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="none"
      onRequestClose={handleCloseAnimation}>
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{translateY: modalY}],
            },
          ]}>
          <View
            style={styles.draggableHandle}
            {...panResponder.panHandlers} // Attach the pan responder to this view
          >
            <View style={styles.handleIndicator} />
          </View>
          <View style={styles.slide}>
            <View style={styles.headerContainer}>
              <View style={styles.titleContainer}>
                <PageButton
                  gradientColors={gradientSelector(actions?.category)}
                  iconSize={iconSizeSelector(actions?.category)}
                  name={iconSelector(actions?.category)}
                  size={8}
                />
                <Text style={styles.categoryText}>{actions?.category}</Text>
              </View>
            </View>
            <Text style={styles.bodyPartText}>Target: {actions?.bodyPart}</Text>
            <Text style={styles.descriptionText}>Action: {actions?.text}</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // Align modal to the bottom
  },
  draggableHandle: {
    width: '100%', // Make handle as wide as modal
    height: 20, // Set a fixed height for the handle area
    justifyContent: 'center', // Center the handle indicator
    alignItems: 'center',
    backgroundColor: '#ffffff', // Give it a distinct background color
    borderTopLeftRadius: 20, // Match the modal's border radius
    borderTopRightRadius: 20,
    marginTop: -16, // Move the handle indicator up to overlap the modal
    marginBottom: 0, // Add some space between the handle and the content
  },
  handleIndicator: {
    width: 80,
    height: 6,
    backgroundColor: '#ccc', // Color for the handle indicator
    borderRadius: 6, // Ensure the handle is above the content
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotStyle: {
    backgroundColor: 'rgba(0,0,0,.2)', // Inactive dot color
    width: 8, // Dot width
    height: 8, // Dot height
    borderRadius: 4, // Make it circular
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: -30,
  },
  activeDotStyle: {
    backgroundColor: '#F94A8C', // Active dot color
    width: 8, // Dot width
    height: 8, // Dot height
    borderRadius: 4, // Make it circular
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: -30,
  },
  modalContent: {
    width: 300,
    height: '30%', // Adjust as needed
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    elevation: 4,
    alignSelf: 'center',
    marginBottom: 20,
  },
  closeButton: {},
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  categoryText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 6,
  },
  bodyPartText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 0,
  },
});

export default AdviceModal;
