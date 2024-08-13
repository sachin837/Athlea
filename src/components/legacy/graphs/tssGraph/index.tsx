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
import {Dimensions} from 'react-native';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const TSSGraph = ({data, widthPercentage = 0.9}) => {
  const formatDate = d3.timeFormat('%b %d');
  const {width: screenWidth} = Dimensions.get('window');
  const svgWidth = screenWidth * widthPercentage; // Adjust as needed
  const svgHeight = 80; // Adjust as needed
  const barPadding = 0.2;
  const theme = useTheme();

  const maxValue = d3.max(data, d => d.load);

  // Creating scales
  const xScale = d3
    .scaleBand()
    .domain(data.map(d => d.date))
    .range([0, svgWidth])
    .paddingInner(0.2);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.load)])
    .range([svgHeight - 20, 0]);

  // Prepare animated values for each bar
  const animatedHeights = data.map(() => useSharedValue(0));

  const animatedTSSHeights = data.map(d =>
    useSharedValue(d.additionalData ? 0 : d.load),
  );
  // Animate bars on mount
  // Animate bars and TSS heights on mount
  useEffect(() => {
    // Animate each bar's height
    animatedHeights.forEach((animatedHeight, index) => {
      const barHeight = yScale(0) - yScale(data[index].load);
      animatedHeight.value = withTiming(barHeight, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
    });

    // Animate TSS height
    animatedTSSHeights.forEach((animatedTSSHeight, index) => {
      const barHeight = yScale(data[index].load);
      const tssValue = data[index].additionalData || 0;
      const tssHeight = (tssValue / data[index].load) * (svgHeight - barHeight);
      animatedTSSHeight.value = withTiming(tssHeight, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
    });
  }, [data, yScale, animatedHeights, animatedTSSHeights]);

  const selectedActivityTSSIndex = data.findIndex(
    d => d.additionalData !== undefined,
  );

  return (
    <Svg width={svgWidth} height={svgHeight + 45}>
      <G>
        {data.map((item, index) => {
          const barWidth = xScale.bandwidth();
          const barX = xScale(item.date);
          const totalLoad = item.load + (item.additionalData || 0);
          const barY = yScale(totalLoad);
          const barHeight = svgHeight - barY;
          const originalBarHeight = svgHeight - yScale(item.load);

          const tssHeight = item.additionalData
            ? (item.additionalData / item.load) * originalBarHeight
            : 0;
          const tssYPosition = svgHeight - tssHeight;

          const animatedProps = useAnimatedProps(() => ({
            height: animatedHeights[index].value,
            y: svgHeight - animatedHeights[index].value,
          }));
          // Animated properties for the TSS bar
          const selectAnimatedProps = useAnimatedProps(() => ({
            height: animatedTSSHeights[index].value,
            // y position should stay at the bottom
            y: svgHeight - animatedTSSHeights[index].value,
          }));

          let fillColor = 'grey'; // Default color for bars after the selectedActivityTSS
          let fillOpacity = 1; // Default opacity

          if (index < selectedActivityTSSIndex) {
            // Bars before the selectedActivityTSS
            fillColor = '#37C6C4';
          } else if (index === selectedActivityTSSIndex) {
            // Bar with the selectedActivityTSS
            fillColor = '#d3d3d3'; // Color for the selectedActivityTSS bar // Reduced opacity for the selectedActivityTSS bar
          } else {
            // Bars after the selectedActivityTSS
            fillColor = '#d3d3d3';
          }

          // Ensure we have valid numbers for calculation to avoid division by zero or NaN results
          const validLoad = item.load && item.load > 0 ? item.load : 1; // Fallback to 1 if load is 0 or invalid
          const validAdditionalData = item.additionalData || 0; // Fallback to 0 if additionalData is undefined

          // Calculate the percentage increase with safeguards
          const percentageIncrease = (validAdditionalData / validLoad) * 100;

          const textYPosition = svgHeight - animatedTSSHeights[index].value - 5;

          return (
            <>
              <AnimatedRect
                key={`bar-${item.date}`}
                x={barX}
                y={yScale(item.load)}
                width={barWidth}
                height={originalBarHeight}
                fill={fillColor}
                fillOpacity={fillOpacity}
                animatedProps={animatedProps}
                rx="4"
                ry="4"
              />
              {item.additionalData && (
                <AnimatedRect
                  key={`tss-${item.date}`}
                  x={barX}
                  y={svgHeight - tssHeight}
                  width={barWidth}
                  fill="#9746FF"
                  animatedProps={selectAnimatedProps}
                  rx="4"
                  ry="4"
                />
              )}
              {item.additionalData && (
                <Text
                  x={barX + barWidth / 2}
                  y={textYPosition - 57}
                  fontSize="14"
                  fill="#9746FF"
                  fontWeight="500"
                  textAnchor="middle">
                  {`+${percentageIncrease.toFixed(0)}%`}
                </Text>
              )}
            </>
          );
        })}
        <Text
          x={xScale(data[0].date)}
          y={svgHeight + 20}
          fontSize="12"
          fill="black"
          fontWeight="500"
          textAnchor="start">
          {formatDate(new Date(data[0].date))}
        </Text>
        <Text
          x={xScale(data[data.length - 1].date) + xScale.bandwidth()}
          y={svgHeight + 20} // Adjust this value as needed to place the text below the graph
          fontSize="12"
          fill="black"
          fontWeight="500"
          textAnchor="end">
          {formatDate(new Date(data[data.length - 1].date))}
        </Text>
      </G>
    </Svg>
  );
};

export default TSSGraph;
