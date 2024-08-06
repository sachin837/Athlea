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
import CommentComp from '../../message/comment';
import {useModal} from '../../../../contexts/ModalContext.tsx';
import CommentActiveComp from '../../message/commentActive';
import NumberSelector from '../../selectors/NumberSelector';

const TrainingMessageModal = ({
  showMessage,
  content = "The past week's training regimen was characterized by a focus on foundational aerobic building while also incorporating short, high-intensity intervals on Wednesday. The systematic approach aimed to gradually bolster endurance, anaerobic capacity, and physiological adaptability to varied workout intensities.",
  showSelector = false,
  isVisible,
  onClose,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.ValueXY()).current; // Add this line for the draggable feature
  const theme = useTheme();
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gesture) => {
        if (gesture.dy > 100) {
          // If dragged down significantly, close the modal
          handleClosePress();
        } else {
          // Reset position if not dragged enough
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      pan.setValue({x: 0, y: 0}); // Reset pan value when modal is not visible
    }
  }, [isVisible, animatedValue, pan]);

  const handleClosePress = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => onClose && onClose()); // Use onClose callback here
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="none">
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
            <CommentActiveComp
              MessageContent={content}
              TimeTextContent="last updated 1 minute"
              animate={true}
            />
            <View
              style={{
                paddingVertical: 30,
              }}>
              <NumberSelector start={8} end={48} />
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Add</Text>
          </TouchableOpacity>
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
    left: 15,
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
    width: 380, // Adjust width as needed
    height: '100%', // Adjust height as needed
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 20,
    alignItems: 'center', // Center content horizontally
  },
  closeButton: {
    backgroundColor: '#5390DF', // Example button color
    paddingVertical: 10,
    paddingHorizontal: 85,
    borderRadius: 10,
    marginBottom: 10,
  },
  selector: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 15, // Space between header and main image
    textAlign: 'left',
    width: '100%',
    marginTop: 5,
    flex: 1,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  actionContainer: {
    marginTop: 10,
  },
  actions: {
    fontSize: 18,
    color: '#666',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TrainingMessageModal;
