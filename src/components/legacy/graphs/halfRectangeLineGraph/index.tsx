import React, {useEffect} from 'react';
import {Svg, Rect, Text, G} from 'react-native-svg';
import * as d3 from 'd3';
import {useTheme} from 'styled-components/native';
import {View} from 'react-native';
import {useFilter} from '../../../../contexts/FilterContext.tsx';
import {useDispatch, useSelector} from 'react-redux';
const formatDate = d3.timeFormat('%b %d');

const HalfRectangleLineGraph = ({data}) => {
  const svgWidth = 350 / 2.5;
  const svgHeight = 92;
  const rectWidth = 3;
  const rectHeight = 10;
  const rectPadding = 0.5; // Padding between each rectangle
  const borderRadius = 2; // Border radius for each rectangle
  const leftPadding = 15; // Adjust this value to accommodate your largest label
  const rightPadding = 4; // Right paddi ng to prevent cutting off values on the right side
  const theme = useTheme();
  // New right padding to provide space for y-axis labels
  const yAxisLabelRightPadding = 10;

  // Adjust xScale range to add space for y-axis labels
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, d => new Date(d.date)))
    .range([leftPadding, svgWidth - rightPadding - yAxisLabelRightPadding]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.load)])
    .range([svgHeight - rectHeight, 0]);

  // Determine the min and max values for the value
  const minValue = d3.min(data, d => d.load);
  const maxValue = d3.max(data, d => d.load);

  // Increase SVG width to accommodate y-axis labels
  const svgWidthWithLabels = svgWidth + yAxisLabelRightPadding;

  return (
    <View>
      <Svg width={svgWidthWithLabels} height={svgHeight}>
        <G>
          {data.map((d, index) => (
            <Rect
              key={index}
              x={xScale(new Date(d.date)) - rectWidth / 2 + index * rectPadding}
              y={yScale(d.load)}
              width={rectWidth}
              height={rectHeight}
              fill={theme.fourth}
              rx={borderRadius} // Set x-axis border radius
              ry={borderRadius} // Set y-axis border radius
            />
          ))}
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
            x={xScale(new Date(data[data.length - 1].date)) + 16}
            y={svgHeight}
            fontSize="12"
            fill="black"
            fontWeight={500}
            textAnchor="end">
            {formatDate(new Date(data[data.length - 1].date))}
          </Text>
        </G>
      </Svg>
    </View>
  );
};

export default HalfRectangleLineGraph;
