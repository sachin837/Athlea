import React from 'react';
import {Svg, Rect, Text, Path, Circle} from 'react-native-svg';
import * as d3 from 'd3';
import {useTheme} from 'styled-components/native';
import {View} from 'react-native';
import {useFilter} from '../../../../../contexts/FilterContext.tsx';

const formatDate = d3.timeFormat('%b %d');

const DayLineGraph = () => {
  const svgWidth = 325 / 2.5; // Adjust as necessary
  const svgHeight = 65; // Set height as necessary

  const theme = useTheme();

  const {data} = useFilter();

  // Create scales
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, d => new Date(d.date))) // Use scaleTime for dates
    .range([0, svgWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.load)])
    .range([svgHeight, 0]);

  // Define the lines
  const normalLine = d3
    .line()
    .x(d => xScale(new Date(d.date)))
    .y(d => yScale(d.load))
    .curve(d3.curveMonotoneX);

  const highlightLine = d3
    .line()
    .x(d => xScale(new Date(d.date)))
    .y(d => yScale(d.load))
    .curve(d3.curveMonotoneX)
    .defined(d => d.highlight); // Only define the line for points with highlight === true

  // Path data for the entire line and the highlighted segment
  const normalPath = normalLine(data);
  const highlightPath = highlightLine(data.filter(d => d.highlight));

  return (
    <View>
      <Svg width={svgWidth} height={svgHeight}>
        <Path
          d={normalPath}
          fill="none"
          stroke={theme.secondary}
          strokeWidth={2}
        />
        {highlightPath && (
          <Path
            d={highlightPath}
            fill="none"
            stroke={theme.secondary || 'red'} // Use a highlight color defined in your theme or a default color
            strokeWidth={2}
          />
        )}
        {/* Text for the first and last date */}
        <Text
          x={xScale(new Date(data[0].date))}
          y={svgHeight}
          fontSize="12"
          fill="black"
          fontWeight={500}
          textAnchor="start">
          {formatDate(new Date(data[0].date))}
        </Text>
        <Text
          x={xScale(new Date(data[data.length - 1].date))}
          y={svgHeight}
          fontSize="12"
          fill="black"
          fontWeight={500}
          textAnchor="end">
          {formatDate(new Date(data[data.length - 1].date))}
        </Text>
        {/* Add more text elements if needed */}
      </Svg>
    </View>
  );
};

export default DayLineGraph;
