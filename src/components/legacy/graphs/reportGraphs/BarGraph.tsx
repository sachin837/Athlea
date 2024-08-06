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

const BarGraph = () => {
  const formatDate = d3.timeFormat('%b, %d');
  const svgWidth = 40;
  const svgHeight = 40;
  const barPadding = 0.2;

  // Default data
  const defaultData = [
    {date: '2024-03-01', load: 40},
    {date: '2024-03-02', load: 20},
    {date: '2024-03-03', load: 30},
    {date: '2024-03-04', load: 14},
  ];

  const maxValue = d3.max(defaultData, d => d.load);

  const xScale = d3
    .scaleBand()
    .domain(defaultData.map(d => d.date))
    .range([0, svgWidth])
    .padding(barPadding);

  const yScale = d3.scaleLinear().domain([0, maxValue]).range([svgHeight, 0]);

  const theme = useTheme();

  const animatedHeights = defaultData.map(() => useSharedValue(0));

  useEffect(() => {
    animatedHeights.forEach((animatedHeight, index) => {
      const barHeight = yScale(0) - yScale(defaultData[index].load);
      animatedHeight.value = withTiming(barHeight, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
    });
  }, [yScale, animatedHeights]);

  if (!defaultData || defaultData.length === 0) {
    return <Text>No data available</Text>;
  }

  return (
    <Svg width={svgWidth} height={svgHeight}>
      <G>
        {defaultData.map((item, index) => {
          const animatedProps = useAnimatedProps(() => ({
            height: animatedHeights[index].value,
            y: svgHeight - animatedHeights[index].value,
          }));

          return (
            <AnimatedRect
              key={item.date}
              x={xScale(item.date)}
              y={yScale(item.load)}
              width={xScale.bandwidth()}
              fill={theme.fourth}
              rx="4"
              ry="4"
              animatedProps={animatedProps}
            />
          );
        })}
      </G>
    </Svg>
  );
};

export default BarGraph;
