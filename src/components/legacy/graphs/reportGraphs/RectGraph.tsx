import React, {useEffect} from 'react';
import {Svg, Rect, Text, G} from 'react-native-svg';
import * as d3 from 'd3';
import {useTheme} from 'styled-components/native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const RectGraph = () => {
  const svgWidth = 40; // Adjust as necessary
  const svgHeight = 40; // Adjust as necessary
  const rectWidth = 3;
  const rectHeight = 10;
  const barPadding = 0.2;

  // Default data
  const defaultData = [
    {date: '2024-03-01', load: 34},
    {date: '2024-03-02', load: 4},
    {date: '2024-03-03', load: 28},
    {date: '2024-03-04', load: 11},
    {date: '2024-03-05', load: 14},
    // Add more data points if needed
  ];

  const maxValue = d3.max(defaultData, d => d.load);

  // Use scaleBand to get the x position for each rectangle
  const xScale = d3
    .scaleBand()
    .domain(defaultData.map(d => d.date))
    .range([0, svgWidth])
    .padding(barPadding);

  // Use scaleLinear for y position because the bar height will animate from 0 to the load value
  const yScale = d3
    .scaleLinear()
    .domain([0, maxValue])
    .range([svgHeight - rectHeight, 0]);

  const theme = useTheme();

  // Create an animated value for each bar
  const animatedValues = defaultData.map(() => useSharedValue(0));

  useEffect(() => {
    // Animate the bars' y position
    animatedValues.forEach((val, index) => {
      val.value = withTiming(yScale(defaultData[index].load), {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
    });
  }, [yScale, animatedValues]);

  if (!defaultData || defaultData.length === 0) {
    return <Text>No data available</Text>;
  }

  return (
    <Svg width={svgWidth} height={svgHeight}>
      <G>
        {defaultData.map((item, index) => {
          const animatedProps = useAnimatedProps(() => ({
            y: animatedValues[index].value,
          }));

          return (
            <AnimatedRect
              key={item.date}
              x={xScale(item.date) + xScale.bandwidth() / 2 - rectWidth / 2}
              y={svgHeight - rectHeight} // Start at the bottom of the SVG
              width={rectWidth}
              height={rectHeight}
              fill={theme.fourth} // Use your theme color here
              rx={2} // Adjust for rounded corners
              animatedProps={animatedProps}
            />
          );
        })}
      </G>
    </Svg>
  );
};

export default RectGraph;
