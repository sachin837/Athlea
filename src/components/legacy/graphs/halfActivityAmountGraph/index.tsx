import React from 'react';
import {Svg, Rect, Text} from 'react-native-svg';
import * as d3 from 'd3';
import {useTheme} from 'styled-components/native';
import {addDays, format, getHours, parseISO} from 'date-fns';

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

const HalfActivityAmountGraph = ({activitiesData, filterType}) => {
  const svgWidth = 364; // Fixed SVG width
  const svgHeight = 65; // Height remains the same
  const theme = useTheme();

  // Calculate dynamic bar width and padding
  const barPadding = 2; // Adjust as necessary for padding between bars
  const totalPaddingWidth = barPadding * (activitiesData.length - 1);
  const availableWidthForBars = svgWidth - totalPaddingWidth;
  const barWidth = availableWidthForBars / activitiesData.length;
  // Find the maximum number of activities for the y-axis scale
  // Standardize date formats to include a time component if missing
  const standardizedData = activitiesData.map(item => ({
    ...item,
    date: item.date.includes('T') ? item.date : `${item.date}T00:00:00`,
  }));

  // Convert standardized date strings to Date objects
  const processedData = activitiesData.map(activity => {
    const date = parseISO(activity.date);
    // Apply modifications only for 'Day' filter type
    if (filterType === 'Day') {
      const hour = getHours(date);
      // Keep activities values only for hours 9 and 17, set others to 0
      const activities = hour === 9 || hour === 17 ? activity.activities : 0;
      return {...activity, date, activities};
    }
    // For other filter types, return the data unchanged
    return {...activity, date, activities: activity.activities};
  });

  // Define scales
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(processedData, d => d.date))
    .range([0, svgWidth - barWidth]);

  const lastBarXPosition = xScale(
    processedData[processedData.length - 1]?.date,
  );
  // Optionally add half the barWidth to center the label, or adjust as needed
  const lastLabelXPosition = lastBarXPosition + barWidth;

  const maxActivities = d3.max(processedData, d => d.activities) || 0;
  const yScale = d3
    .scaleLinear()
    .domain([0, maxActivities])
    .range([svgHeight, 0]);

  // Format date for display
  const formatDateForDisplay = date => format(date, 'MMM d');

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

  const labelHeight = 0;
  const labelMargin = 10; // Space between the top of the SVG and the label
  // Height of the text label

  return (
    <Svg width={svgWidth + 3} height={svgHeight + labelHeight + labelMargin}>
      {processedData.map((item, index) => (
        <Rect
          key={index}
          x={xScale(item.date)}
          y={yScale(item.activities)}
          width={barWidth}
          height={
            svgHeight - yScale(item.activities) - (labelHeight + labelMargin)
          } // Adjust bar height
          fill={theme.third}
          rx="4" // Rounded corners on the x-axis
          ry="4" // Rounded corners on the y-axis
        />
      ))}

      <Text
        x={xScale(processedData[0]?.date)}
        y={svgHeight + 10}
        fontSize="12"
        fill="black"
        fontWeight="500"
        textAnchor="start">
        {formatDateForDisplay(processedData[0]?.date)}
      </Text>
      <Text
        x={lastLabelXPosition} // Use the dynamically calculated position
        y={svgHeight + 10}
        fontSize="12"
        fill="black"
        fontWeight="500"
        textAnchor="end">
        {' '}
        {/* Ensure textAnchor is "end" to align the end of the text with the calculated x */}
        {formatDateForDisplay(processedData[processedData.length - 1]?.date)}
      </Text>

      {/* {intenseBlocks.length > 0 &&
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
        ))} */}
    </Svg>
  );
};

export default HalfActivityAmountGraph;
