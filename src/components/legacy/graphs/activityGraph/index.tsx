import React from 'react';
import {Svg, Rect, Text} from 'react-native-svg';
import * as d3 from 'd3';
import {useTheme} from 'styled-components/native';
import {addDays, format, parseISO} from 'date-fns';

const originalData = [
  {load: 124, category: 'light'},
  {load: 106, category: 'light'},
  {load: 126, category: 'moderate'},
  {load: 88, category: 'moderate'},
  {load: 69, category: 'rest'},
  {load: 130, category: 'moderate'},
  {load: 118, category: 'moderate'},
  {load: 178, category: 'moderate'},
  {load: 129, category: 'intense'},
  {load: 30, category: 'moderate'},
  {load: 30, category: 'moderate'},
  {load: 30, category: 'moderate'},
  {load: 30, category: 'moderate'},
  {load: 30, category: 'moderate'},
  {load: 30, category: 'rest'},
];

const startDate = new Date();

const data = originalData.map((item, index) => ({
  date: format(addDays(startDate, index), 'yyyy-MM-dd'),
  ...item,
}));

const ActivityGraph = ({selectedDate, activitiesData}) => {
  const svgWidth = 325 / 2.5; // Adjust as necessary
  const svgHeight = 85; // Increased to accommodate labels
  const barPadding = 0.2; // Adjust as necessary for padding between bars
  const theme = useTheme();
  const activitiesData15 = activitiesData.slice(0, 15);
  console.log(activitiesData15, 'activitiesData15');
  // Find the maximum number of activities for the y-axis scale
  const maxActivities = d3.max(activitiesData, d => d.Activities) || 0;
  const formattedSelectedDate = d3.timeFormat('%Y-%m-%d')(
    new Date(selectedDate),
  );
  // Scales for the graph
  const xScale = d3
    .scaleBand()
    .domain(activitiesData15.map(d => d.selectedDate))
    .range([0, svgWidth])
    .padding(barPadding);

  const yScale = d3
    .scaleLinear()
    .domain([0, maxActivities])
    .range([svgHeight - 40, 0]);

  // Format date for display
  const formatDateForDisplay = dateStr => {
    if (!dateStr) return ''; // Return empty string if dateStr is undefined
    try {
      return format(parseISO(dateStr), 'MMM, d');
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };
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

  return (
    <Svg width={svgWidth} height={svgHeight}>
      {/* Rectangles for bars */}
      {activitiesData15.map((item, index) => {
        const barHeight = yScale(0) - yScale(item.Activities);
        const fill =
          item.selectedDate === formattedSelectedDate ? theme.third : 'grey';
        return (
          <Rect
            key={item.selectedDate}
            x={xScale(item.selectedDate)}
            y={yScale(item.Activities)}
            width={xScale.bandwidth()}
            height={barHeight}
            fill={fill}
            rx="4" // Rounded corners on the x-axis
            ry="4" // Rounded corners on the y-axis
          />
        );
      })}

      <Text
        x={xScale(activitiesData15[0]?.date)}
        y={svgHeight - 20}
        fontSize="12"
        fill="black"
        fontWeight="500"
        textAnchor="start">
        {formatDateForDisplay(activitiesData15[0]?.selectedDate)}
      </Text>
      <Text
        x={
          xScale(activitiesData15[activitiesData15.length - 1]?.selectedDate) +
          xScale.bandwidth()
        }
        y={svgHeight - 20}
        fontSize="12"
        fill="black"
        fontWeight="500"
        textAnchor="end">
        {formatDateForDisplay(
          activitiesData15[activitiesData15.length - 1]?.selectedDate,
        )}
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

export default ActivityGraph;
