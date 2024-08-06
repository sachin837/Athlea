import React, {useEffect} from 'react';
import {Svg, Text, G, Rect} from 'react-native-svg';
import * as d3 from 'd3';
import {useTheme} from 'styled-components/native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const TextGraph = () => {
  const svgWidth = 34;
  const svgHeight = 40; // Height of the entire graph
  const barHeight = 7; // Height of each bar
  const barGap = 2; // Gap between each bar

  // Update your default data to have 5 data points
  const defaultData = [
    {label: 'Item 1', load: 16},
    {label: 'Item 2', load: 16},
    {label: 'Item 3', load: 16},
    {label: 'Item 4', load: 16},
    {label: 'Item 5', load: 16},
  ];

  const maxValue = d3.max(defaultData, d => d.load);

  // Horizontal scale for bar width
  const xScale = d3.scaleLinear().domain([0, maxValue]).range([0, svgWidth]);

  const theme = useTheme();

  const animatedWidths = defaultData.map(() => useSharedValue(0));

  useEffect(() => {
    animatedWidths.forEach((animatedWidth, index) => {
      animatedWidth.value = withTiming(xScale(defaultData[index].load), {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
    });
  }, [xScale, animatedWidths]);

  if (!defaultData || defaultData.length === 0) {
    return <Text>No data available</Text>;
  }

  return (
    <Svg width={svgWidth} height={svgHeight}>
      <G>
        {defaultData.map((item, index) => {
          const barY = index * (barHeight + barGap);

          const animatedProps = useAnimatedProps(() => ({
            width: animatedWidths[index].value,
          }));

          return (
            <AnimatedRect
              x="0"
              y={barY}
              height={barHeight}
              fill={theme.fourth}
              rx="4" // For rounded corners
              animatedProps={animatedProps}
            />
          );
        })}
      </G>
    </Svg>
  );
};

export default TextGraph;
