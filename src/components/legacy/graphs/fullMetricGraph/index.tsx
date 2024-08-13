import React, {useEffect} from 'react';
import {Svg, Rect, G, Text} from 'react-native-svg';
import * as d3 from 'd3';
import {useTheme} from 'styled-components/native';
import {useFilter} from '../../../../contexts/FilterContext.tsx';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const formatTime = d3.timeFormat('%b, %d'); // Format for displaying date

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const FullMetricGraph = ({data}) => {
  // Accessing filtered data
  console.log('data', data);
  const theme = useTheme();
  const rectWidth = 3;
  const rectHeight = 10;
  const svgWidth = 400;
  const svgHeight = 200;
  const padding = 35;
  const paddingLeft = 30;
  const paddingRight = 60;
  const borderRadius = 2;

  // Preprocess data
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
  sortedData.forEach(d => (d.date = new Date(d.date)));

  // Scales
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(sortedData, d => d.date))
    .range([paddingLeft, svgWidth - paddingRight]);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(sortedData, d => d.load)])
    .range([svgHeight, 0]);

  // Shared values

  // Min and max load values
  const minValueData = d3.min(sortedData, d => d.load);
  const maxValueData = d3.max(sortedData, d => d.load);

  const maxValue = d3.max(sortedData, d => d.load);

  // Percentiles
  const percentiles = [25, 50, 75, 100].map(p => (p * maxValue) / 100);
  const startingYs =
    data && data.length > 0 ? data.map(() => useSharedValue(svgHeight)) : [];

  // Initialize shared values for animation
  const animatedYs = sortedData.map(d => useSharedValue(svgHeight));
  const animatedXs = sortedData.map(d => useSharedValue(xScale(d.date)));

  useEffect(() => {
    sortedData.forEach((d, index) => {
      animatedYs[index].value = withTiming(yScale(d.load), {
        duration: 1000,
        easing: Easing.out(Easing.quad),
      });
      animatedXs[index].value = xScale(d.date);
    });
  }, [sortedData, animatedYs, animatedXs]);

  return (
    <Svg width={svgWidth} height={svgHeight}>
      <G>
        {sortedData.map((d, index) => {
          const animatedProps = useAnimatedProps(() => ({
            x: animatedXs[index].value - rectWidth / 2, // Center the rectangle on its x position
            y: animatedYs[index].value, // Animate from bottom to final y position
            width: rectWidth,
            height: svgHeight - animatedYs[index].value, // Make sure this calculation is correct
            fill: d.load === maxValue ? theme.primary : theme.secondary,
          }));

          return (
            <AnimatedRect key={`rect-${index}`} animatedProps={animatedProps} />
          );
        })}
        <Text
          x={xScale(minValueData.date)}
          y={yScale(minValueData.load) + 20} // Adjusted for visibility
          fontSize="14"
          fill="#000"
          textAnchor="middle">
          {`${minValueData.load}`}
        </Text>
        <Text
          x={xScale(maxValueData.date)}
          y={yScale(maxValueData.load) - 10} // Adjusted for visibility
          fontSize="14"
          fill="#000"
          textAnchor="middle">
          {`${maxValueData.load}`}
        </Text>
        {/* Add labels */}
        <Text
          x={padding}
          y={svgHeight - 10} // Adjusted for visibility
          fontSize="12"
          fill="#000"
          fontWeight="500">
          {formatTime(new Date(data[0].date))}
        </Text>
        <Text
          x={svgWidth - padding}
          y={svgHeight - 10} // Adjusted for visibility
          fontSize="12"
          fill="#000"
          fontWeight="500"
          textAnchor="end">
          {formatTime(new Date(data[data.length - 1].date))}
        </Text>
      </G>
      <G>
        {percentiles.map((value, index) => {
          return (
            <Text
              key={`percentile-${index}`}
              x={svgWidth - padding + 10} // Position near the right edge
              y={yScale(value)} // Position at the corresponding y-coordinate
              fontSize="12"
              fill="#000"
              textAnchor="start" // Align text to the start (left-align)
            >
              {`${value.toFixed(0)}`}
            </Text>
          );
        })}
      </G>
    </Svg>
  );
};

export default FullMetricGraph;
