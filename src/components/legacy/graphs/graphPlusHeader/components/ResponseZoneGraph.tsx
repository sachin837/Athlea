import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import {G, Rect, Svg, Text} from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const ResponseZoneGraph = ({data, widthPercentage = 0.8}) => {
  const {width: screenWidth} = Dimensions.get('window');
  const svgWidth = screenWidth * widthPercentage; // Adjust the width to fit the screen
  const barHeight = 42; // Height of each bar
  const textSpacing = 6; // Space between zone text and bpm range
  const svgHeight = data.length * (barHeight + 20); // Height adjustment for text
  const reversedData = data.slice().reverse(); // Reverse the data to display in descending order

  const timeToSeconds = timeStr => {
    const parts = timeStr.split(':').map(Number);
    let seconds = 0;
    if (parts.length === 3) {
      // Format: HH:MM:SS
      seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      // Format: MM:SS
      seconds = parts[0] * 60 + parts[1];
    } else if (parts.length === 1) {
      // Format: SS
      seconds = parts[0];
    }
    return seconds;
  };

  // Convert each zone's time to seconds and sum them up
  const totalSeconds = data.reduce(
    (acc, zone) => acc + timeToSeconds(zone.time),
    0,
  );

  // Now calculate the percentage of each zone based on the total
  data.forEach(zone => {
    const zoneSeconds = timeToSeconds(zone.time);
    const percentage = (zoneSeconds / totalSeconds) * 100;
    zone.percentage = `${percentage.toFixed(2)}%`; // Update the data with the calculated percentage
  });

  // Now calculate the percentage of each zone based on the total
  const updatedData = data
    .map(zone => {
      const zoneSeconds = timeToSeconds(zone.time);
      const percentage = (zoneSeconds / totalSeconds) * 100;
      return {
        ...zone,
        percentage: `${percentage.toFixed(2)}%`, // Update the data with the calculated percentage
      };
    })
    .reverse();

  // Initialize animated width values for each bar
  const animatedWidths = updatedData.map(() => useSharedValue(0));

  useEffect(() => {
    // Animate each bar's width after calculating the final bar width
    updatedData.forEach((zone, index) => {
      const percentageValue = parseFloat(zone.percentage) / 100; // Parse as float to keep the decimal
      const barWidth = svgWidth * percentageValue;
      animatedWidths[index].value = withTiming(barWidth, {
        duration: 600,
        easing: Easing.out(Easing.exp),
      });
    });
  }, [updatedData, svgWidth, animatedWidths]);

  return (
    <Svg width={svgWidth} height={svgHeight}>
      {updatedData.map((zone, index) => {
        const y = index * (barHeight + 20); // Adjust y position for bars
        const percentageValue = parseInt(zone.percentage, 10) / 100; // Convert percentage to decimal
        const barWidth = svgWidth * percentageValue; // Calculate width of the bar
        const centerY = y + barHeight / 2; // Center of the bar

        const animatedProps = useAnimatedProps(() => ({
          width: animatedWidths[index].value,
        }));
        return (
          <G key={zone.zone}>
            {/* Colored bar */}
            <AnimatedRect
              animatedProps={animatedProps}
              x="0"
              y={y}
              height={barHeight}
              fill={zone.color}
            />

            {/* Group for text elements to allow for easy styling and positioning */}
            <G fill="black" y={-7}>
              {/* Zone text */}
              <Text x="10" y={centerY} fontSize="15" alignmentBaseline="middle">
                {zone.zone}
              </Text>
              {/* BPM Range text */}
              <Text
                x="10"
                y={centerY + 18} // Position slightly lower within the bar
                fontSize="12"
                alignmentBaseline="middle">
                {zone.bpmRange}
              </Text>
            </G>
            {/* Time text */}
            <Text
              x={svgWidth - 80} // Adjust the x-position for time text
              y={y + barHeight / 2}
              fontSize="16"
              fontWeight={500}
              fill="black"
              alignmentBaseline="middle"
              textAnchor="end">
              {zone.time}
            </Text>

            {/* Percentage text */}
            <Text
              x={svgWidth} // Adjust the x-position for percentage text
              y={y + barHeight / 2}
              fontSize="16"
              fill="black"
              textAnchor="end"
              alignmentBaseline="middle">
              {zone.percentage}
            </Text>
          </G>
        );
      })}
    </Svg>
  );
};

export default ResponseZoneGraph;
