import React from 'react';
import {Svg, Path, Circle, Text} from 'react-native-svg';
import * as d3 from 'd3';
import {useTheme} from 'styled-components/native';
import {Dimensions} from 'react-native';

const formatDate = d3.timeFormat('%b, %d');

const LineGraph = ({data}) => {
  const padding = {top: 20, right: 20, bottom: 10, left: 20};

  const svgWidth = Dimensions.get('window').width / 3; // Adjust as necessary
  const svgHeight = 60; // Adjust as necessary
  const width = svgWidth - padding.left - padding.right;
  const height = svgHeight - padding.top - padding.bottom;
  // Calculate max load value from data
  const maxValue = d3.max(data, d => d.load) || 0;

  // Create scales
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, d => new Date(d.date)))
    .range([0, width]);

  const yScale = d3.scaleLinear().domain([0, maxValue]).range([height, 0]);
  const theme = useTheme();

  // Line generator
  const lineGenerator = d3
    .line()
    .x(d => xScale(new Date(d.date)) + padding.left) // Shifted by left padding
    .y(d => yScale(d.load) + padding.top) // Shifted by top padding
    .curve(d3.curveMonotoneX); // This makes the line curved

  // Generate the path data
  const lineData = lineGenerator(data);

  return (
    <Svg width={svgWidth} height={svgHeight}>
      {/* Path for the line graph */}
      <Path
        d={lineData}
        fill="none"
        stroke={theme.primaryscale[4]}
        strokeWidth="2"
      />

      {/* Circles for data points */}
      {data.map((item, index) => (
        <Circle
          key={item.date}
          cx={xScale(new Date(item.date)) + padding.left} // Shifted by left padding
          cy={yScale(item.load) + padding.top} // Shifted by top padding
          r={4}
          fill="white"
          stroke={
            index === data.length - 1 ? theme.secondary : theme.primaryscale[4]
          }
          strokeWidth={2}
        />
      ))}

      {/* Labels for the dates */}
      {/* <Text
        x={padding.left}
        y={svgHeight}
        fontSize="12"
        fill="black"
        textAnchor="start">
        {formatDate(new Date(data[0].date))}
      </Text>
      <Text
        x={svgWidth}
        y={svgHeight}
        fontSize="12"
        fill="black"
        textAnchor="end">
        {formatDate(new Date(data[data.length - 1].date))}
      </Text> */}
    </Svg>
  );
};

export default LineGraph;
