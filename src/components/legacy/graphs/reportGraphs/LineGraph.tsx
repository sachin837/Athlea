import React, {useEffect} from 'react';
import {Svg, Path, Text, G} from 'react-native-svg';
import * as d3 from 'd3';
import {useTheme} from 'styled-components/native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const LineGraph = () => {
  const formatDate = d3.timeFormat('%b, %d');
  const svgWidth = 40; // Adjust to your preferred width
  const svgHeight = 40; // Adjust to your preferred height

  // Default data
  const defaultData = [
    {date: '2024-03-01', load: 4},
    {date: '2024-03-02', load: 20},
    {date: '2024-03-03', load: 10},
    {date: '2024-03-04', load: 12},
    {date: '2024-03-05', load: 20},
    {date: '2024-03-06', load: 18},
  ];

  const maxValue = d3.max(defaultData, d => d.load);

  const xScale = d3
    .scalePoint()
    .domain(defaultData.map(d => d.date))
    .range([0, svgWidth])
    .padding(0.5); // Adjust for padding around the graph

  const yScale = d3.scaleLinear().domain([0, maxValue]).range([svgHeight, 0]); // Y-coordinates on the screen are from top to bottom

  const theme = useTheme();

  const lineGenerator = d3
    .line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.load));
  // This makes the line smooth

  const pathData = lineGenerator(defaultData);

  const animatedPathLength = useSharedValue(0);

  useEffect(() => {
    animatedPathLength.value = withTiming(pathData.length, {
      duration: 500,
      easing: Easing.out(Easing.exp),
    });
  }, [pathData.length]);

  const animatedProps = useAnimatedProps(
    () => ({
      strokeDashoffset: animatedPathLength.value,
    }),
    [animatedPathLength],
  );

  if (!defaultData || defaultData.length === 0) {
    return <Text>No data available</Text>;
  }

  return (
    <Svg width={svgWidth} height={svgHeight}>
      <G>
        <AnimatedPath
          d={pathData}
          fill="none"
          stroke={theme.fourth}
          strokeWidth={2}
          animatedProps={animatedProps}
        />
      </G>
    </Svg>
  );
};

export default LineGraph;
