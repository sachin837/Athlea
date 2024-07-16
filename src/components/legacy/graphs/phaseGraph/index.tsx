import React from 'react';
import {Svg, Rect, Text} from 'react-native-svg';
import * as d3 from 'd3';
import {useTheme} from 'styled-components/native';

const PhaseGraph = ({
  selectedDate = '',
  data,
  svgWidthProp = 280,
  svgHeightProp = 65,
  phase,
  roundedX = 4,
  roundedY = 4,
}) => {
  const svgWidth = svgWidthProp; // Adjust as necessary
  const svgHeight = svgHeightProp; // Increased to accommodate labels
  const barPadding = 0.2; // Adjust as necessary for padding between bars
  const formatDate = d3.timeFormat('%b, %d');

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
    .range([svgHeight - 20, 0]);

  const theme = useTheme();

  // Find the intense blocks
  const intenseBlocks = data.reduce((blocks, item, index) => {
    if (item.category === 'intense') {
      if (!blocks.length || blocks[blocks.length - 1].end !== index - 1) {
        blocks.push({start: index, end: index});
      } else {
        blocks[blocks.length - 1].end = index;
      }
    }
    return blocks;
  }, []);

  const labelHeight = 20;
  const labelMargin = 5; // Space between the top of the SVG and the label
  // Height of the text label

  const formattedSelectedDate = d3.timeFormat('%Y-%m-%d')(
    new Date(selectedDate),
  );

  return (
    <Svg width={svgWidth} height={svgHeight}>
      {/* Rectangles for bars */}
      {data.map((item, index) => {
        const barHeight = yScale(0) - yScale(item.load);
        const isHighlighted = item.phase === phase;
        return (
          <Rect
            key={item.date}
            x={xScale(item.date)}
            y={yScale(item.load)}
            width={xScale.bandwidth()}
            height={barHeight}
            fill={isHighlighted ? theme.secondary : theme.primaryscale[7]}
            rx={roundedX} // Rounded corners on the x-axis
            ry={roundedY} // Rounded corners on the y-axis
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

      {intenseBlocks.length > 0 &&
        intenseBlocks.map((block, i) => (
          <Text
            key={`intense-block-${i}`}
            x={
              (xScale(block.start) + xScale(block.end) + xScale.bandwidth()) / 2
            }
            y={labelMargin} // Position this at the top of the SVG
            fontSize="12"
            fill="black"
            textAnchor="middle">
            Intense Phase
          </Text>
        ))}
    </Svg>
  );
};

export default PhaseGraph;
