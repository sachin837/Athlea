import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const NumberSelector = ({start, end}) => {
  const middleNumber = Math.floor((end - start) / 2) + start;
  const [selectedNumber, setSelectedNumber] = useState(middleNumber);
  const flatListRef = useRef(null);
  const numbers = Array.from({length: end - start + 1}, (_, i) => i + start);

  const SCREEN_WIDTH = Dimensions.get('window').width;
  const ITEM_SIZE = 60; // The width of each item including padding/margin if any
  const ITEM_PADDING_HORIZONTAL = 160; // Half the screen minus half the item size

  const scrollToIndex = index => {
    // Calculate the center position of the selected item
    const x = index * ITEM_SIZE - ITEM_PADDING_HORIZONTAL + ITEM_SIZE / 2;
    flatListRef.current?.scrollToOffset({
      offset: x,
      animated: true,
    });
  };

  const getOpacity = number => {
    const distance = Math.abs(selectedNumber - number);
    if (distance === 0) {
      return 1; // Selected number
    } else if (distance === 1) {
      return 0.6; // One step away from the selected number
    } else if (distance === 2) {
      return 0.3; // Two steps away from the selected number
    } else {
      return 0; // Even further away
    }
  };

  const getFontSize = number => {
    const distance = Math.abs(selectedNumber - number);
    if (distance === 0) {
      return 22; // Selected number
    } else if (distance === 1) {
      return 20; // All other numbers
    } else {
      return 18; // Even further away
    }
  };

  useEffect(() => {
    // Calculate initial index
    const initialIndex = start - numbers[0];
    scrollToIndex(initialIndex);
  }, []);

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setSelectedNumber(viewableItems[0].item);
    }
  });

  const renderItem = ({item}) => {
    const isSelected = item === selectedNumber;
    const opacity = getOpacity(item); // Get opacity based on the item's distance from the selected number
    const fontSize = getFontSize(item); // Get font size based on the item's distance from the selected number

    return (
      <View style={{width: ITEM_SIZE, opacity}}>
        <TouchableOpacity
          onPress={() => {
            scrollToIndex(numbers.indexOf(item));
          }}>
          <Text
            style={[
              styles.numberText,
              {fontSize}, // Apply the dynamic font size
              isSelected && styles.selectedText, // If it's the selected item, apply the selected text style
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
        {isSelected && <View style={styles.indicator} />}
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={numbers}
      renderItem={renderItem}
      keyExtractor={item => item.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToAlignment="start"
      getItemLayout={(data, index) => ({
        length: ITEM_SIZE,
        offset: ITEM_SIZE * index,
        index,
      })}
      contentContainerStyle={{paddingHorizontal: ITEM_PADDING_HORIZONTAL}}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 30,
      }}
      decelerationRate="fast"
    />
  );
};

const styles = StyleSheet.create({
  numberText: {
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
  },
  selectedText: {
    color: '#5390DF',
    fontWeight: 'bold',
  },
  indicator: {
    width: 0,
    height: 0,
    borderLeftWidth: 10, // The width of the left border
    borderRightWidth: 10, // The width of the right border
    borderBottomWidth: 10, // The width of the bottom border to make the triangle
    borderLeftColor: 'transparent', // Left border color
    borderRightColor: 'transparent', // Right border color
    borderBottomColor: '#5390DF', // Bottom border color, the visible part of the triangle
    alignSelf: 'center', // Center the triangle horizontally within its parent
    marginTop: 4, // Distance from the text above
  },
});

export default NumberSelector;
