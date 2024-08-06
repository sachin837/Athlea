import React from 'react';
import {Svg, Rect, Text} from 'react-native-svg';
import * as d3 from 'd3';
import {useTheme} from 'styled-components/native';

const defaultData = [
  {date: '2024-02-28', load: 1.54, phase: 'Transition'},
  {date: '2024-02-29', load: 2.25, phase: 'Transition'},
  {date: '2024-03-01', load: 2.52, phase: 'Transition'},
  {date: '2024-03-02', load: 3.45, phase: 'Transition'},
  {date: '2024-03-03', load: 1.51, phase: 'Transition'},
  {date: '2024-03-04', load: 4.55, phase: 'Transition'},
  {date: '2024-03-05', load: 4.15, phase: 'Prep'},
  {date: '2024-03-06', load: 2.45, phase: 'Prep'},
  {date: '2024-03-07', load: 3.25, phase: 'Prep'},
  {date: '2024-03-08', load: 1.55, phase: 'Prep'},
  {date: '2024-03-09', load: 2.15, phase: 'Prep'},
  {date: '2024-03-10', load: 4.45, phase: 'Prep'},
  {date: '2024-03-11', load: 2.55, phase: 'Prep'},
  {date: '2024-03-12', load: 1.35, phase: 'General'},
  {date: '2024-03-13', load: 3.25, phase: 'General'},
  {date: '2024-03-14', load: 4.15, phase: 'General'},
];

const formatDate = d3.timeFormat('%b, %d');
const formatDateTime = d3.timeFormat('%Y-%m-%d');

// Function to get today's date in the required format
const getFormattedTodayDate = () => formatDateTime(new Date());

const HalfLoadGraph = ({
  selectedDate = getFormattedTodayDate(),
  dataProp = [],
}) => {
  const data = dataProp.length > 0 ? dataProp : defaultData;
  const svgWidth = 325 / 2.5; // Adjust as necessary
  const svgHeight = 85; // Increased to accommodate labels
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
        return (
          <Rect
            key={item.date}
            x={xScale(item.date)}
            y={yScale(item.load)}
            width={xScale.bandwidth()}
            height={barHeight}
            fill={
              item.date === formattedSelectedDate ? theme.secondary : 'grey'
            }
            rx="4" // Rounded corners on the x-axis
            ry="4" // Rounded corners on the y-axis
          />
        );
      })}

      <Text
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
      </Text>

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

export default HalfLoadGraph;
