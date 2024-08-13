import React from 'react';
import {Svg, Rect, Text} from 'react-native-svg';
import * as d3 from 'd3';
import {useTheme} from 'styled-components/native';
import {Dimensions} from 'react-native';

const formatDate = d3.timeFormat('%b, %d');

const HalfGraph = ({data}) => {
  const svgWidth = Dimensions.get('window').width / 3; // Adjust as necessary
  const svgHeight = 60; // Increased to accommodate labels
  const barPadding = 0.2; // Adjust as necessary for padding between bars

  // Calculate max load value from data
  const maxValue = d3.max(data, d => d.load);

  // Create scales
  const xScale = d3
    .scaleBand()
    .domain(data.map(d => d.date))
    .range([0, svgWidth])
    .padding(barPadding);

  const yScale = d3.scaleLinear().domain([0, maxValue]).range([svgHeight, 8]);

  const theme = useTheme();

  const lastItemIndex = data.length - 1;

  return (
    <Svg width={svgWidth} height={svgHeight}>
      {/* Rectangles for bars */}
      {data.map((item, index) => {
        const barHeight = yScale(0) - yScale(item.load);
        const isLastItem = index === lastItemIndex;
        return (
          <Rect
            key={item.date}
            x={xScale(item.date)}
            y={yScale(item.load)}
            width={xScale.bandwidth()}
            height={barHeight}
            fill={isLastItem ? theme.secondary : theme.primaryscale[4]}
            rx="4" // Rounded corners on the x-axis
            ry="4" // Rounded corners on the y-axis
          />
        );
      })}

      {/* <Text
        x={xScale(data[0].date)}
        y={svgHeight - 20}
        fontSize="12"
        fill="black"
        fontWeight={500}
        textAnchor="start">
        {formatDate(new Date(data[0].date))}
      </Text>
      <Text
        x={xScale(data[data.length - 1].date) + xScale.bandwidth()}
        y={svgHeight - 20}
        fontSize="12"
        fill="black"
        fontWeight={500}
        textAnchor="end">
        {formatDate(new Date(data[data.length - 1].date))}
      </Text> */}
    </Svg>
  );
};

export default HalfGraph;
