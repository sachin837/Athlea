import React, {useMemo} from 'react';
import {Svg, Rect, Text, Line, G} from 'react-native-svg';
import * as d3 from 'd3';
import {useTheme} from 'styled-components/native';
import {addDays, format, parseISO} from 'date-fns';

interface ActivityData {
  date: Date;
  activitiesTimeSpent: number;
  activityDetails: {type: string; timeSpent: number}[];
}

interface Props {
  activitiesData: ActivityData[];
  filterType: 'Day' | 'Week' | 'Month' | 'Year';
}

const FullActivityGraph: React.FC<Props> = ({activitiesData, filterType}) => {
  const svgWidth = 350; // Fixed SVG width
  const extraTopSpace = 30; // Additional space at the top for labels
  const svgHeight = 115 + extraTopSpace; // Height remains the same
  const theme = useTheme();
  const extraSpaceForLabels = 20; // Extra space for "min" and "hrs" labels
  console.log('filter type', filterType);

  // Calculate dynamic bar width and padding
  const barPadding = 2; // Adjust as necessary for padding between bars
  const totalPaddingWidth = barPadding * (activitiesData.length - 1);
  const activityPadding = 0.5; // Padding between activities within a bar
  const availableWidthForBars = svgWidth - totalPaddingWidth;
  const barWidth = availableWidthForBars / activitiesData.length;
  // Find the maximum number of activities for the y-axis scale
  // Standardize date formats to include a time component if missing
  const standardizedData = activitiesData.map(item => ({
    ...item,
    date: item.date.includes('T') ? item.date : `${item.date}T00:00:00`,
  }));

  const topPadding = 20; // Additional padding at the top
  const labelHeight = 0;
  const labelMargin = 10; // Space between the top of the SVG and the label
  const bottomPadding = 20; // Padding at the bottom of the SVG

  // Adjusted total SVG height to include top padding
  const totalSvgHeight =
    svgHeight + labelHeight + labelMargin * 2 + bottomPadding;

  // Convert standardized date strings to Date objects
  // Filter activitiesData to only include two specific hours for 'Day' filter
  const processedData = useMemo(() => {
    // Handle 'Day' filter type separately
    if (filterType === 'Day') {
      // Create a base array representing 24 hours of a day, with no activities
      const baseDay = Array.from({length: 24}, (_, hour) => {
        const date = new Date(activitiesData[0].date);
        date.setHours(hour, 0, 0, 0);
        return {
          date: new Date(date), // Ensure date is a Date object
          activitiesTimeSpent: 0,
          activityDetails: [],
        };
      });

      // Map the actual data onto the base day
      const fullDayData = baseDay.map(baseHour => {
        const activityForHour = activitiesData.find(
          activity =>
            new Date(activity.date).getHours() === baseHour.date.getHours(),
        );

        // If there's activity data for this hour, use it
        if (activityForHour) {
          return {
            ...baseHour,
            activitiesTimeSpent: activityForHour.activitiesTimeSpent,
            activityDetails: activityForHour.activityDetails,
          };
        }

        // Otherwise, return the base hour (representing no activity)
        return baseHour;
      });

      // Adjust the activity times for the hours not of interest
      const hoursToShow = [9, 17]; // Example: Only show data for 9 AM and 5 PM
      return fullDayData.map(hourData => {
        if (!hoursToShow.includes(hourData.date.getHours())) {
          // For hours not of interest, set the values to null or 0
          return {
            ...hourData,
            activitiesTimeSpent: null,
            activityDetails: [],
          };
        }
        return hourData;
      });
    } else {
      // For other filter types, return the original data
      return activitiesData
        .map(item => ({
          ...item,
          date: new Date(item.date), // Ensure date is a Date object
        }))
        .sort((a, b) => a.date - b.date); // Ensure data is sorted
    }
  }, [activitiesData, filterType]);
  // Define scales
  const xScale = d3
    .scaleBand()
    .domain(processedData.map(d => d.date.toISOString()))
    .range([0, svgWidth])
    .padding(0.1);

  const maxTimeSpent = d3.max(processedData, d => d.activitiesTimeSpent) || 0;

  const yScale = d3
    .scaleLinear()
    .domain([0, maxTimeSpent])
    .range([svgHeight, 0]);

  // Define colors for different activities
  const activityColors: {[key: string]: string} = {
    running: theme.primary,
    cycling: theme.secondary,
    lifting: theme.third,
    swimming: theme.fourth,
  };

  const lastDataDate =
    processedData[processedData.length - 1]?.date.toISOString();
  const lastLabelXPosition = xScale(lastDataDate) + xScale.bandwidth();

  // Format date for display
  const formatDateForDisplay = date => format(date, 'MMM d');

  const timeUnitLabelYPosition = yScale(maxTimeSpent); // Adjust the value as needed to position above the first Y-axis label

  const yAxisValues = [
    0,
    maxTimeSpent * 0.25,
    maxTimeSpent * 0.5,
    maxTimeSpent * 0.75,
    maxTimeSpent,
  ];

  const labelSpace = 20; // Space reserved for the "min" and "hrs" label

  const adjustedSvgWidth = svgWidth + 30; // Added space for Y-axis labels

  // Calculate the y position for the max value line
  const maxYPosition = yScale(maxTimeSpent) + 3;

  return (
    <Svg width={adjustedSvgWidth} height={totalSvgHeight}>
      <G>
        {processedData.map((item, idx) => {
          let cumulativeHeight = 0;
          return item.activityDetails.map((activity, index) => {
            const rectHeight =
              (activity.timeSpent / maxTimeSpent) * svgHeight -
              activityPadding * 2 * index;
            const rectY =
              svgHeight -
              (cumulativeHeight + rectHeight) -
              activityPadding * index;
            cumulativeHeight += rectHeight + activityPadding;

            return (
              <Rect
                key={`${idx}-${index}`}
                x={xScale(item.date.toISOString())}
                y={rectY}
                width={xScale.bandwidth()}
                height={rectHeight}
                fill={activityColors[activity.type] || 'grey'}
                rx={2}
                ry={2}
              />
            );
          });
        })}

        <Text
          x={xScale(processedData[0]?.date.toISOString())}
          y={svgHeight + labelMargin + labelHeight + 10} // Adjusted y position
          fontSize="12"
          fill="black"
          fontWeight="500"
          textAnchor="start">
          {formatDateForDisplay(processedData[0]?.date)}
        </Text>
        <Text
          x={lastLabelXPosition}
          y={svgHeight + labelMargin + labelHeight + 10} // Adjusted y position
          fontSize="12"
          fill="black"
          fontWeight="500"
          textAnchor="end">
          {formatDateForDisplay(processedData[processedData.length - 1]?.date)}
        </Text>

        {yAxisValues.map((value, index) => (
          <Text
            key={`y-axis-${index}`}
            x={svgWidth + 5} // Position text just right of the bars
            y={yScale(value)} // Use yScale to position Y-axis labels correctly
            fontSize="10"
            fill="black"
            textAnchor="start" // Align text to the right; adjust as needed
          >
            {`${value.toFixed(1)}`}
          </Text>
        ))}

        <Line
          x1="0"
          y1={maxYPosition}
          x2={svgWidth}
          y2={maxYPosition}
          stroke={theme.primary}
          strokeWidth="1"
          strokeDasharray="5, 5" // This creates the dashed effect
        />

        {/* Label for the maximum value */}
        <Text
          x={svgWidth + 5} // Slightly to the right of the line
          y={maxYPosition + 5} // Adjust vertically to align with the line, +5 for a little offset above the line
          fontSize="10"
          fill="black"
          textAnchor="start" // Align the text to the start (left)
        >
          {`${maxTimeSpent.toFixed(1)} `}
        </Text>
      </G>
      <G>
        <Text
          x={svgWidth + 22} // Align to the right
          y={labelSpace - 20} // Vertically centered in the label space
          fontSize="10"
          fill="black"
          textAnchor="end" // Align text to the end for right alignment
        >
          {filterType === 'Day' ? 'min' : 'hrs'}
        </Text>
      </G>
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

export default FullActivityGraph;
