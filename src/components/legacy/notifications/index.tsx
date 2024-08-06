import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  ScrollView,
} from 'react-native';
import NotificationComp from '../message/notification';

const screenHeight = Dimensions.get('window').height;
console.log(screenHeight); // 896
const initialPeekHeight = screenHeight * 0.62; // Correctly set to 20% of the screen height
console.log(initialPeekHeight); // 627.2
const expandedHeight = screenHeight - 100; // 80% of the screen height for the expanded state
console.log(expandedHeight); // 896

const DraggableAreaHeight = 20; // Height for the draggable area

const Notifications = () => {
  const translateY = useRef(
    new Animated.Value(screenHeight - initialPeekHeight),
  ).current; // Initialize off-screen
  const [isExpanded, setIsExpanded] = useState(false); // Track if the panel is expanded
  const [panelHeight, setPanelHeight] = useState(initialPeekHeight); // Initialize with the peek height
  const scrollViewRef = useRef(); // Add this line

  useEffect(() => {
    if (isExpanded) {
      // When the panel is expanded, scroll to the end of the ScrollView
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [isExpanded]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      // Allow dragging only if moving up and not yet expanded
      if (!isExpanded) {
        translateY.setValue(
          Math.max(screenHeight - initialPeekHeight + gesture.dy, 0),
        );
      }
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dy < 0) {
        // Drag was upwards, expand the bottom sheet
        Animated.spring(translateY, {
          toValue: 0, // Animate to expanded height
          useNativeDriver: true,
        }).start();
        setIsExpanded(true);
      } else if (isExpanded && gesture.dy > 0) {
        // If dragging down while expanded, collapse to peek height
        Animated.spring(translateY, {
          toValue: screenHeight - initialPeekHeight, // Animate to initial peek height
          useNativeDriver: true,
        }).start();
        setIsExpanded(false);
      }
    },
  });

  // Example notification list
  const notificationList = [
    {
      BotTextContent: 'Athlea',
      TimeTextContent: '12:05PM',
      MessageTextContent: 'Your order has been delivered.',
      HighlightedContent: 'Order',
    },
    {
      BotTextContent: 'Athlea',
      TimeTextContent: '12:20PM',
      MessageTextContent: 'Your order has been delivered.',
      HighlightedContent: 'Order',
    },
    {
      BotTextContent: 'Athlea',
      TimeTextContent: '12:30PM',
      MessageTextContent: 'Your order has been delivered.',
      HighlightedContent: 'Order',
    },
    {
      BotTextContent: 'Athlea',
      TimeTextContent: '12:35PM',
      MessageTextContent: 'Your order has been delivered.',
      HighlightedContent: 'Order',
    },
    {
      BotTextContent: 'Athlea',
      TimeTextContent: '1:05PM',
      MessageTextContent: 'Your order has been delivered.',
      HighlightedContent: 'Order',
    },
    {
      BotTextContent: 'Athlea',
      TimeTextContent: '1:10PM',
      MessageTextContent: 'Your order has been delivered.',
      HighlightedContent: 'Order',
    },
    {
      BotTextContent: 'Athlea',
      TimeTextContent: '1:15PM',
      MessageTextContent: 'Your order has been delivered.',
      HighlightedContent: 'Order',
    },
    {
      BotTextContent: 'Athlea',
      TimeTextContent: '2:30PM',
      MessageTextContent: 'Hello, your order has been shipped.',
      HighlightedContent: 'Order',
    },
    {
      BotTextContent: 'Athlea',
      TimeTextContent: '3:45PM',
      MessageTextContent: 'Your weekly summary is ready to view.',
      HighlightedContent: 'summary',
    },
    {
      BotTextContent: 'Athlea',
      TimeTextContent: '4:15PM',
      MessageTextContent: 'A new login to your account was detected.',
      HighlightedContent: 'login',
    },
  ];

  const renderedNotifications = isExpanded
    ? notificationList
    : notificationList.slice(-1);

  return (
    <Animated.View
      style={[
        styles.bottomSheet,
        {
          transform: [{translateY}],
          height: isExpanded ? expandedHeight : initialPeekHeight,
        },
      ]}>
      <View style={styles.draggableArea} {...panResponder.panHandlers}>
        <View style={styles.draggableHandle} />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{justifyContent: 'flex-end'}}
        ref={scrollViewRef} // Add this line
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: false})
        }>
        {renderedNotifications.map((notification, index) => (
          <NotificationComp
            key={index}
            BotTextContent={notification.BotTextContent}
            TimeTextContent={notification.TimeTextContent}
            MessageTextContent={notification.MessageTextContent}
            HighlightedContent={notification.HighlightedContent}
          />
        ))}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    // Add a padding at the bottom to push the content up above the text input // Adjust this value based on the height of your text input
    paddingBottom: 120,
    maxHeight: 600,
  },
  draggableArea: {
    height: DraggableAreaHeight,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'transparent', // Give it a distinct background color
  },
  draggableHandle: {
    width: 40, // Width of the handle
    height: 5, // Height of the handle
    borderRadius: 2.5, // Make it rounded
    backgroundColor: '#ccc', // Color of the handle, often a light grey
    marginTop: 1, // Space from the top of the draggable area
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: initialPeekHeight,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 7,
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: 1000, // Ensure it's above other components
  },
});

export default Notifications;
