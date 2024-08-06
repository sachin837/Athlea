import React from 'react';
import {View, Dimensions} from 'react-native';
import {Svg, Rect, Text} from 'react-native-svg';
import * as d3 from 'd3-scale';

const screenWidth = Dimensions.get('window').width / 3;
const svgHeight = 60; // Adjust as needed
const padding = {top: 5, bottom: 5, left: 10, right: 10};

// Set up scales
const timeScale = d3
  .scaleTime()
  .range([padding.left, screenWidth - padding.right]);
const stageScale = d3
  .scaleBand()
  .domain(['AWAKE', 'REM', 'CORE', 'DEEP']) // Excluding 'INBED'
  .range([padding.top, svgHeight - padding.bottom])
  .padding(0.1);

const stageColorMapping = {
  AWAKE: '#FE7F66', // Example color
  REM: '#32ACE5',
  CORE: '#007AFF',
  DEEP: '#3D3BA3',
};

const SleepGraph = ({data}) => {
  // Filter out the 'INBED' stages
  const filteredData = data.filter(d => d.stage !== 'INBED');

  // Continue with the rest of your component logic using 'filteredData'
  timeScale.domain([
    new Date(
      Math.min(...filteredData.map(d => new Date(d.startTime).getTime())),
    ),
    new Date(Math.max(...filteredData.map(d => new Date(d.endTime).getTime()))),
  ]);

  const stageHeight = stageScale.bandwidth();

  const renderRects = filteredData.map((d, index) => {
    const x = timeScale(new Date(d.startTime));
    const y = stageScale(d.stage);
    const width = timeScale(new Date(d.endTime)) - x;
    const height = stageHeight;
    const color = stageColorMapping[d.stage] || 'transparent'; // Fallback to transparent if no color is found

    return (
      <Rect
        key={`bar-${index}`}
        x={x}
        y={y}
        rx={3}
        ry={3}
        width={width}
        height={height}
        fill={color}
      />
    );
  });

  return (
    <View>
      <Svg height={svgHeight} width={screenWidth}>
        {renderRects}
      </Svg>
    </View>
  );
};

export default SleepGraph;
