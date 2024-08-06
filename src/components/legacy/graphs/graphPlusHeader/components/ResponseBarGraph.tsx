import React, {useEffect, useRef} from 'react';
import {Svg, Rect, Text, G, Line} from 'react-native-svg';
import * as d3 from 'd3';
import {useTheme} from 'styled-components/native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const ResponseBarGraph = ({
  data,
  showTrendLine = false,
  widthPercentage = 0.8,
}) => {
  const formatDate = d3.timeFormat('%b, %d');
  const {width: screenWidth} = Dimensions.get('window'); // Get the width of the screen
  const svgWidth = screenWidth * widthPercentage; // Use 90% of screen width for the SVG
  const svgHeight = 90; // Adjusted to accommodate labels
  const barPadding = 0.2; // Adjust as necessary for padding between bars

  // Calculate max load value from data
  const maxValue = d3.max(data, d => d.load);

  // Create scales
  const xScale = d3
    .scaleBand()
    .domain(data.map(d => d.date))
    .range([0, svgWidth])
    .padding(barPadding);

  const yScale = d3
    .scaleLinear()
    .domain([0, maxValue])
    .range([svgHeight - 40, 0]);

  const theme = useTheme();

  const animatedHeights = data.map(() => useSharedValue(0));

  useEffect(() => {
    // Animate each bar's height after calculating the final bar height
    animatedHeights.forEach((animatedHeight, index) => {
      const barHeight = yScale(0) - yScale(data[index].load);
      animatedHeight.value = withTiming(barHeight, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
    });
  }, [data, yScale, animatedHeights]);

  let trendLine = null;
  let trendText = null;
  if (showTrendLine) {
    const totalLoad = data.reduce((sum, {load}) => sum + load, 0);
    const averageLoad = totalLoad / data.length;
    const startLoad = data[0]?.load || 0;
    const endLoad = data[data.length - 1]?.load || 0;
    const percentageIncrease = ((endLoad - startLoad) / startLoad) * 100;
    const trendLineY = yScale(averageLoad);

    trendLine = (
      <Line
        x1="0"
        y1={trendLineY + 5}
        x2={svgWidth}
        y2={trendLineY}
        stroke={theme.primaryscale[5]}
        strokeWidth="2"
      />
    );

    trendText = (
      <Text
        x={svgWidth - 232}
        y={trendLineY} // Adjust this value as needed
        fill={theme.fourth}
        fontSize="12"
        textAnchor="end">
        {`${percentageIncrease.toFixed(2)}% Increase`}
      </Text>
    );
  }

  if (!data || data.length === 0) {
    return <Text>No data available</Text>;
  }

  return (
    <Svg width={svgWidth} height={svgHeight}>
      <G>
        {data.map((item, index) => {
          // Worklet to animate properties
          const animatedProps = useAnimatedProps(() => ({
            height: animatedHeights[index].value,
            y: svgHeight - 40 - animatedHeights[index].value, // Adjusted Y position calculation
          }));

          return (
            <AnimatedRect
              key={item.date}
              x={xScale(item.date)}
              y={yScale(item.load)}
              width={xScale.bandwidth()}
              fill={item.highlight ? theme.fourth : 'grey'}
              rx="4"
              ry="4"
              animatedProps={animatedProps}
            />
          );
        })}
      </G>

      {showTrendLine && trendLine}
      {showTrendLine && trendText}

      {/* Optional: if you want to display the first and last date labels */}
      <Text
        x={xScale(data[0].date)}
        y={svgHeight - 20}
        fontSize="12"
        fill="black"
        fontWeight="500"
        textAnchor="start">
        {formatDate(new Date(data[0].date))}
      </Text>
      <Text
        x={xScale(data[data.length - 1].date) + xScale.bandwidth()}
        y={svgHeight - 20}
        fontSize="12"
        fill="black"
        fontWeight="500"
        textAnchor="end">
        {formatDate(new Date(data[data.length - 1].date))}
      </Text>
    </Svg>
  );
};

export default ResponseBarGraph;
