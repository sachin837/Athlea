import React from 'react';
import {Svg, Rect, Text, G} from 'react-native-svg';
import * as d3 from 'd3';
import {useTheme} from 'styled-components/native';

const FullGraph = ({
  data,
  currentScore,
  currentDate,
  onScoreSelect,
  selectedScore,
  activity,
  passedInColor = 'grey',
  dateLabelColor = 'black',
}) => {
  const formatDate = d3.timeFormat('%b, %d');
  const svgWidth = 356; // Adjust as necessary
  const svgHeight = 90; // Increased to accommodate labels
  const barPadding = 0.2; // Adjust as necessary for padding between bars

  // Calculate max load value from data
  const maxValue = d3.max(data, d => d.value);

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

  if (!data || data.length === 0) {
    return <Text>No data available</Text>;
  }

  const numericCurrentScore = Number(currentScore);
  const currentIndex = data.findIndex(
    item => item.value === numericCurrentScore,
  );

  if (currentIndex === -1) {
    return <Text>Current score not found in data</Text>;
  }

  const selectedBarX = xScale(data[currentIndex].date) + xScale.bandwidth() / 2;
  const translateX = svgWidth / 2 - selectedBarX;

  const getBarFill = item => {
    if (item.date === currentDate) {
      return theme.third;
    } else if (
      item.date === selectedScore.date &&
      item.value === selectedScore.value &&
      activity === true
    ) {
      return theme.third;
    } else if (
      item.date === selectedScore.date &&
      item.value === selectedScore.value
    ) {
      return theme.secondary;
    } else {
      return passedInColor; // Use the passedInColor parameter
    }
  };

  return (
    <Svg width={svgWidth} height={svgHeight}>
      <G translate={`(${translateX}, 0)`}>
        {data.map((item, index) => {
          const barHeight = yScale(0) - yScale(item.value);
          let fill = getBarFill(item);

          return (
            <Rect
              key={item.date}
              x={xScale(item.date)}
              y={yScale(item.value)}
              width={xScale.bandwidth()}
              height={barHeight}
              fill={fill}
              onPress={() => onScoreSelect(item.value, item.date)}
              rx="4" // Rounded corners on the x-axis
              ry="4" // Rounded corners on the y-axis
            />
          );
        })}
      </G>

      <Text
        x={xScale(data[0].date)}
        y={svgHeight - 20}
        fontSize="12"
        fill={dateLabelColor}
        fontWeight={500}
        textAnchor="start">
        {formatDate(new Date(data[0].date))}
      </Text>
      <Text
        x={xScale(data[data.length - 1].date) + xScale.bandwidth()}
        y={svgHeight - 20}
        fontSize="12"
        fill={dateLabelColor}
        fontWeight={500}
        textAnchor="end">
        {formatDate(new Date(data[data.length - 1].date))}
      </Text>
    </Svg>
  );
};

export default FullGraph;
