import React, {useEffect} from 'react';
import {Svg, Rect, Text, G, Line} from 'react-native-svg';
import * as d3 from 'd3';
import {useTheme} from 'styled-components/native';
import {View} from 'react-native';
import {useFilter} from '../../../../contexts/FilterContext';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const formatDate = d3.timeFormat('%b %d');

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const RectangleLineGraph = ({data: propData}) => {
  const svgWidth = 400;
  const svgHeight = 180;
  const rectWidth = 3;
  const padding = 27;
  const rectHeight = 10;
  const rectPadding = 0.5; // Padding between each rectangle
  const borderRadius = 2; // Border radius for each rectangle
  const leftPadding = 30; // Adjust this value to accommodate your largest label
  const rightPadding = 60; // Right padding to prevent cutting off values on the right side

  const theme = useTheme();
  const data = propData; // Use prop data if available, otherwise fallback to context data

  // New right padding to provide space for y-axis labels
  const yAxisLabelRightPadding = 30;

  // Adjust xScale range to add space for y-axis labels
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, d => new Date(d.date)))
    .range([leftPadding, svgWidth - rightPadding - yAxisLabelRightPadding]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.load)]) // Multiply by a factor greater than 1 to add padding at the top
    .range([svgHeight - padding, padding]); // Add padding at the top of the SVG

  // Determine the min and max values for the load
  const minValue = d3.min(data, d => d.load);
  const maxValue = d3.max(data, d => d.load);
  const percentiles = [50, 75, 100, 125].map(p => (p * maxValue) / 100);
  // Increase SVG width to accommodate y-axis labels
  const svgWidthWithLabels = svgWidth + yAxisLabelRightPadding;

  const averageLoad = data.reduce((acc, d) => acc + d.load, 0) / data.length;

  console.log('averageLoad', averageLoad);

  const trendLineStart = {
    x: xScale(d3.min(data, d => new Date(d.date))),
    y: yScale(averageLoad),
  };

  const trendLineEnd = {
    x: xScale(d3.max(data, d => new Date(d.date))),
    y: yScale(averageLoad),
  };

  const startingYs =
    data && data.length > 0 ? data.map(() => useSharedValue(svgHeight)) : [];

  useEffect(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log('No data available for animation');
      return; // Exit if data is not ready
    }

    // Animate to final positions
    data.forEach((d, index) => {
      const finalY = yScale(d.load);
      startingYs[index].value = withTiming(finalY, {
        duration: 1000,
        easing: Easing.out(Easing.quad),
      });
    });
  }, [data, yScale]);

  const minDataPoint = data.reduce((prev, curr) =>
    prev.load < curr.load ? prev : curr,
  );
  const maxDataPoint = data.reduce((prev, curr) =>
    prev.load > curr.load ? prev : curr,
  );

  return (
    <View>
      <Svg width={svgWidthWithLabels} height={svgHeight}>
        <G>
          {data.map((d, index) => {
            const finalX =
              xScale(new Date(d.date)) - rectWidth / 2 + index * rectPadding;
            let fillColor = 'grey'; // Default color for non-min/max values
            if (d.load === maxValue) {
              fillColor = theme.secondary; // Color for max value
            } else if (d.load === minValue) {
              fillColor = theme.secondary; // Color for min value
            }
            // Use animated props for the y attribute
            const animatedProps = useAnimatedProps(() => ({
              y: startingYs[index].value,
              // x is fixed at its final position
              x: finalX,
            }));

            return (
              <AnimatedRect
                key={d.date}
                animatedProps={animatedProps}
                width={rectWidth}
                height={rectHeight}
                fill={fillColor}
                rx={borderRadius}
                ry={borderRadius}
              />
            );
          })}

          <Text
            x={xScale(new Date(minDataPoint.date))} // Use minDataPoint.date
            y={yScale(minDataPoint.load) + 20} // Adjusted for visibility
            fontSize="14"
            fill="#000"
            textAnchor="middle">
            {`Min: ${minDataPoint.load}`}
          </Text>
          <Text
            x={xScale(new Date(maxDataPoint.date))}
            y={yScale(minDataPoint.load) - 28} // Temporarily set to min value position for debugging
            fontSize="14"
            fill="#000"
            textAnchor="middle">
            {`Max: ${maxDataPoint.load}`}
          </Text>
          <Text
            x={xScale(new Date(data[0].date))}
            y={svgHeight - padding} // Adjust this value to bring the label closer to the X-axis
            fontSize="12"
            fill="black"
            fontWeight={500}
            textAnchor="start">
            {formatDate(new Date(data[0].date))}
          </Text>

          <Text
            x={xScale(new Date(data[data.length - 1].date)) + 16}
            y={svgHeight - padding} // Adjust this value as well
            fontSize="12"
            fill="black"
            fontWeight={500}
            textAnchor="end">
            {formatDate(new Date(data[data.length - 1].date))}
          </Text>
        </G>
        <G>
          {percentiles.map((value, index) => {
            return (
              <Text
                key={`percentile-${index}`}
                x={svgWidth - padding} // Position near the right edge
                y={yScale(value) + padding - 10} // Position at the corresponding y-coordinate
                fontSize="12"
                fill="#000"
                textAnchor="start" // Align text to the start (left-align)
              >
                {`${value.toFixed(0)}`}
              </Text>
            );
          })}
        </G>
        <Line
          x1={trendLineStart.x}
          y1={trendLineStart.y}
          x2={trendLineEnd.x}
          y2={trendLineEnd.y}
          stroke={theme.secondary} // Or use theme.secondary as per your theme
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
};

export default RectangleLineGraph;
