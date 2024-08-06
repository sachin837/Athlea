import React, {useState} from 'react';
import {scaleTime, scaleLinear} from 'd3-scale';
import {line} from 'd3-shape';
import {timeMonth} from 'd3-time';
import {ScrollView, Dimensions, View} from 'react-native';
import Svg, {Path, Defs, LinearGradient, Stop, G} from 'react-native-svg';
import Animated, {
  useCode,
  cond,
  eq,
  set,
  call,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {useEffect, useRef} from 'react';
import {max, curveMonotoneX, min, extent} from 'd3';
import {Text as SvgText} from 'react-native-svg';
import theme from '../../../../theme';
import {useTheme} from 'styled-components/native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';

const getRandomTime = (min, max) => {
  const hours = Math.floor(Math.random() * (max - min + 1)) + min;
  const minutes = Math.floor(Math.random() * 60);
  return hours + minutes / 60;
};

// Assuming data is an array of objects with date and value
const data = [
  {
    date: new Date('2020-01-01'),
    value: 1.2166666666666666,
    trainingPhase: 'General',
  },
  {date: new Date('2020-01-02'), value: 1.0, trainingPhase: 'General'},
  {date: new Date('2020-01-03'), value: 1.0, trainingPhase: 'General'},
  {date: new Date('2020-01-04'), value: 1.3, trainingPhase: 'General'},
  {
    date: new Date('2020-01-05'),
    value: 1.2833333333333334,
    trainingPhase: 'General',
  },
  {
    date: new Date('2020-01-06'),
    value: 1.6833333333333333,
    trainingPhase: 'General',
  },
  {date: new Date('2020-01-07'), value: 1.45, trainingPhase: 'General'},
  {
    date: new Date('2020-01-08'),
    value: 1.9666666666666666,
    trainingPhase: 'General',
  },
  {
    date: new Date('2020-01-09'),
    value: 1.0833333333333333,
    trainingPhase: 'General',
  },
  {
    date: new Date('2020-01-10'),
    value: 1.1333333333333333,
    trainingPhase: 'General',
  },
  {
    date: new Date('2020-01-11'),
    value: 1.2666666666666666,
    trainingPhase: 'General',
  },
  {
    date: new Date('2020-01-12'),
    value: 1.3666666666666667,
    trainingPhase: 'General',
  },
  {date: new Date('2020-01-13'), value: 1.25, trainingPhase: 'General'},
  {
    date: new Date('2020-01-14'),
    value: 1.8666666666666667,
    trainingPhase: 'General',
  },
  {
    date: new Date('2020-01-15'),
    value: 1.9333333333333333,
    trainingPhase: 'General',
  },
  {
    date: new Date('2020-01-16'),
    value: 1.4333333333333333,
    trainingPhase: 'General',
  },
  {
    date: new Date('2020-01-17'),
    value: 1.5166666666666666,
    trainingPhase: 'General',
  },
  {
    date: new Date('2020-01-18'),
    value: 1.4333333333333333,
    trainingPhase: 'General',
  },
  {
    date: new Date('2020-01-19'),
    value: 1.1166666666666667,
    trainingPhase: 'General',
  },
  {date: new Date('2020-01-20'), value: 1.5, trainingPhase: 'General'},
  {date: new Date('2020-01-21'), value: 1.1, trainingPhase: 'General'},
  {
    date: new Date('2020-01-22'),
    value: 1.8666666666666667,
    trainingPhase: 'General',
  },
  {
    date: new Date('2020-01-23'),
    value: 1.2333333333333334,
    trainingPhase: 'General',
  },
  {
    date: new Date('2020-01-24'),
    value: 1.7333333333333334,
    trainingPhase: 'General',
  },
  {date: new Date('2020-01-25'), value: 1.45, trainingPhase: 'General'},
  {date: new Date('2020-01-26'), value: 1.05, trainingPhase: 'General'},
  {date: new Date('2020-01-27'), value: 1.0, trainingPhase: 'General'},
  {date: new Date('2020-01-28'), value: 1.65, trainingPhase: 'General'},
  {
    date: new Date('2020-01-29'),
    value: 1.9833333333333334,
    trainingPhase: 'General',
  },
  {date: new Date('2020-01-30'), value: 1.15, trainingPhase: 'General'},
  {date: new Date('2020-01-31'), value: 2.15, trainingPhase: 'Prep'},
  {date: new Date('2020-02-01'), value: 2.15, trainingPhase: 'Prep'},
  {
    date: new Date('2020-02-02'),
    value: 2.033333333333333,
    trainingPhase: 'Prep',
  },
  {
    date: new Date('2020-02-03'),
    value: 2.716666666666667,
    trainingPhase: 'Prep',
  },
  {
    date: new Date('2020-02-04'),
    value: 2.783333333333333,
    trainingPhase: 'Prep',
  },
  {
    date: new Date('2020-02-05'),
    value: 2.8333333333333335,
    trainingPhase: 'Prep',
  },
  {
    date: new Date('2020-02-06'),
    value: 2.716666666666667,
    trainingPhase: 'Prep',
  },
  {date: new Date('2020-02-07'), value: 2.45, trainingPhase: 'Prep'},
  {
    date: new Date('2020-02-08'),
    value: 2.2333333333333334,
    trainingPhase: 'Prep',
  },
  {
    date: new Date('2020-02-09'),
    value: 2.3833333333333333,
    trainingPhase: 'Prep',
  },
  {
    date: new Date('2020-02-10'),
    value: 2.4833333333333334,
    trainingPhase: 'Prep',
  },
  {
    date: new Date('2020-02-11'),
    value: 2.716666666666667,
    trainingPhase: 'Prep',
  },
  {
    date: new Date('2020-02-12'),
    value: 2.5833333333333335,
    trainingPhase: 'Prep',
  },
  {
    date: new Date('2020-02-13'),
    value: 2.316666666666667,
    trainingPhase: 'Prep',
  },
  {
    date: new Date('2020-02-14'),
    value: 2.8333333333333335,
    trainingPhase: 'Prep',
  },
  {date: new Date('2020-02-15'), value: 2.65, trainingPhase: 'Prep'},
  {date: new Date('2020-02-16'), value: 2.0, trainingPhase: 'Prep'},
  {
    date: new Date('2020-02-17'),
    value: 2.5166666666666666,
    trainingPhase: 'Prep',
  },
  {
    date: new Date('2020-02-18'),
    value: 2.183333333333333,
    trainingPhase: 'Prep',
  },
  {
    date: new Date('2020-02-19'),
    value: 2.9166666666666665,
    trainingPhase: 'Prep',
  },
  {
    date: new Date('2020-02-20'),
    value: 2.6333333333333333,
    trainingPhase: 'Prep',
  },
  {date: new Date('2020-02-21'), value: 2.0, trainingPhase: 'Prep'},
  {
    date: new Date('2020-02-22'),
    value: 2.566666666666667,
    trainingPhase: 'Prep',
  },
  {
    date: new Date('2020-02-23'),
    value: 2.283333333333333,
    trainingPhase: 'Prep',
  },
  {date: new Date('2020-02-24'), value: 2.3, trainingPhase: 'Prep'},
  {
    date: new Date('2020-02-25'),
    value: 2.5166666666666666,
    trainingPhase: 'Prep',
  },
  {date: new Date('2020-02-26'), value: 2.35, trainingPhase: 'Prep'},
  {
    date: new Date('2020-02-27'),
    value: 2.2666666666666666,
    trainingPhase: 'Prep',
  },
  {
    date: new Date('2020-02-28'),
    value: 2.683333333333333,
    trainingPhase: 'Prep',
  },
  {date: new Date('2020-02-29'), value: 2.45, trainingPhase: 'Prep'},
  {
    date: new Date('2020-03-01'),
    value: 3.216666666666667,
    trainingPhase: 'Specific 1',
  },
  {
    date: new Date('2020-03-02'),
    value: 3.3666666666666667,
    trainingPhase: 'Specific 1',
  },
  {
    date: new Date('2020-03-03'),
    value: 3.816666666666667,
    trainingPhase: 'Specific 1',
  },
  {
    date: new Date('2020-03-04'),
    value: 3.316666666666667,
    trainingPhase: 'Specific 1',
  },
  {
    date: new Date('2020-03-05'),
    value: 3.783333333333333,
    trainingPhase: 'Specific 1',
  },
  {
    date: new Date('2020-03-06'),
    value: 3.466666666666667,
    trainingPhase: 'Specific 1',
  },
  {date: new Date('2020-03-07'), value: 3.25, trainingPhase: 'Specific 1'},
  {date: new Date('2020-03-08'), value: 3.7, trainingPhase: 'Specific 1'},
  {date: new Date('2020-03-09'), value: 3.95, trainingPhase: 'Specific 1'},
  {
    date: new Date('2020-03-10'),
    value: 3.683333333333333,
    trainingPhase: 'Specific 1',
  },
  {
    date: new Date('2020-03-11'),
    value: 3.433333333333333,
    trainingPhase: 'Specific 1',
  },
  {
    date: new Date('2020-03-12'),
    value: 3.4166666666666665,
    trainingPhase: 'Specific 1',
  },
  {
    date: new Date('2020-03-13'),
    value: 3.8333333333333335,
    trainingPhase: 'Specific 1',
  },
  {
    date: new Date('2020-03-14'),
    value: 3.1666666666666665,
    trainingPhase: 'Specific 1',
  },
  {
    date: new Date('2020-03-15'),
    value: 3.716666666666667,
    trainingPhase: 'Specific 1',
  },
  {
    date: new Date('2020-03-16'),
    value: 3.433333333333333,
    trainingPhase: 'Specific 1',
  },
  {
    date: new Date('2020-03-17'),
    value: 3.783333333333333,
    trainingPhase: 'Specific 1',
  },
  {
    date: new Date('2020-03-18'),
    value: 3.566666666666667,
    trainingPhase: 'Specific 1',
  },
  {date: new Date('2020-03-19'), value: 3.3, trainingPhase: 'Specific 1'},
  {date: new Date('2020-03-20'), value: 4.0, trainingPhase: 'Specific 1'},
  {
    date: new Date('2020-03-21'),
    value: 3.5833333333333335,
    trainingPhase: 'Specific 1',
  },
  {date: new Date('2020-03-22'), value: 4.0, trainingPhase: 'Specific 1'},
  {date: new Date('2020-03-23'), value: 3.9, trainingPhase: 'Specific 1'},
  {
    date: new Date('2020-03-24'),
    value: 3.8833333333333333,
    trainingPhase: 'Specific 1',
  },
  {date: new Date('2020-03-25'), value: 3.15, trainingPhase: 'Specific 1'},
  {
    date: new Date('2020-03-26'),
    value: 3.433333333333333,
    trainingPhase: 'Specific 1',
  },
  {
    date: new Date('2020-03-27'),
    value: 3.933333333333333,
    trainingPhase: 'Specific 1',
  },
  {date: new Date('2020-03-28'), value: 3.8, trainingPhase: 'Specific 1'},
  {
    date: new Date('2020-03-29'),
    value: 3.7666666666666666,
    trainingPhase: 'Specific 1',
  },
  {
    date: new Date('2020-03-30'),
    value: 3.183333333333333,
    trainingPhase: 'Specific 1',
  },
  {
    date: new Date('2020-03-31'),
    value: 4.416666666666667,
    trainingPhase: 'Specific 2',
  },
  {
    date: new Date('2020-04-01'),
    value: 4.733333333333333,
    trainingPhase: 'Specific 2',
  },
  {
    date: new Date('2020-04-02'),
    value: 4.483333333333333,
    trainingPhase: 'Specific 2',
  },
  {date: new Date('2020-04-03'), value: 4.45, trainingPhase: 'Specific 2'},
  {
    date: new Date('2020-04-04'),
    value: 4.683333333333334,
    trainingPhase: 'Specific 2',
  },
  {date: new Date('2020-04-05'), value: 4.0, trainingPhase: 'Specific 2'},
  {
    date: new Date('2020-04-06'),
    value: 4.716666666666667,
    trainingPhase: 'Specific 2',
  },
  {
    date: new Date('2020-04-07'),
    value: 4.066666666666666,
    trainingPhase: 'Specific 2',
  },
  {
    date: new Date('2020-04-08'),
    value: 4.566666666666666,
    trainingPhase: 'Specific 2',
  },
  {date: new Date('2020-04-09'), value: 4.35, trainingPhase: 'Specific 2'},
  {date: new Date('2020-04-10'), value: 4.85, trainingPhase: 'Specific 2'},
  {
    date: new Date('2020-04-11'),
    value: 4.166666666666667,
    trainingPhase: 'Specific 2',
  },
  {
    date: new Date('2020-04-12'),
    value: 4.383333333333334,
    trainingPhase: 'Specific 2',
  },
  {date: new Date('2020-04-13'), value: 4.35, trainingPhase: 'Specific 2'},
  {
    date: new Date('2020-04-14'),
    value: 4.133333333333334,
    trainingPhase: 'Specific 2',
  },
  {date: new Date('2020-04-15'), value: 4.8, trainingPhase: 'Specific 2'},
  {
    date: new Date('2020-04-16'),
    value: 4.516666666666667,
    trainingPhase: 'Specific 2',
  },
  {
    date: new Date('2020-04-17'),
    value: 4.766666666666667,
    trainingPhase: 'Specific 2',
  },
  {
    date: new Date('2020-04-18'),
    value: 4.533333333333333,
    trainingPhase: 'Specific 2',
  },
  {
    date: new Date('2020-04-19'),
    value: 4.366666666666666,
    trainingPhase: 'Specific 2',
  },
  {
    date: new Date('2020-04-20'),
    value: 4.616666666666666,
    trainingPhase: 'Specific 2',
  },
  {
    date: new Date('2020-04-21'),
    value: 4.316666666666666,
    trainingPhase: 'Specific 2',
  },
  {date: new Date('2020-04-22'), value: 4.8, trainingPhase: 'Specific 2'},
  {
    date: new Date('2020-04-23'),
    value: 4.133333333333334,
    trainingPhase: 'Specific 2',
  },
  {
    date: new Date('2020-04-24'),
    value: 4.033333333333333,
    trainingPhase: 'Specific 2',
  },
  {
    date: new Date('2020-04-25'),
    value: 4.233333333333333,
    trainingPhase: 'Specific 2',
  },
  {date: new Date('2020-04-26'), value: 4.25, trainingPhase: 'Specific 2'},
  {date: new Date('2020-04-27'), value: 4.0, trainingPhase: 'Specific 2'},
  {date: new Date('2020-04-28'), value: 4.15, trainingPhase: 'Specific 2'},
  {
    date: new Date('2020-04-29'),
    value: 4.816666666666666,
    trainingPhase: 'Specific 2',
  },
  {date: new Date('2020-04-30'), value: 5.15, trainingPhase: 'Specific 3'},
  {date: new Date('2020-05-01'), value: 5.3, trainingPhase: 'Specific 3'},
  {date: new Date('2020-05-02'), value: 5.5, trainingPhase: 'Specific 3'},
  {
    date: new Date('2020-05-03'),
    value: 5.066666666666666,
    trainingPhase: 'Specific 3',
  },
  {date: new Date('2020-05-04'), value: 5.9, trainingPhase: 'Specific 3'},
  {
    date: new Date('2020-05-05'),
    value: 5.983333333333333,
    trainingPhase: 'Specific 3',
  },
  {
    date: new Date('2020-05-06'),
    value: 5.883333333333334,
    trainingPhase: 'Specific 3',
  },
  {
    date: new Date('2020-05-07'),
    value: 5.466666666666667,
    trainingPhase: 'Specific 3',
  },
  {date: new Date('2020-05-08'), value: 5.6, trainingPhase: 'Specific 3'},
  {date: new Date('2020-05-09'), value: 5.5, trainingPhase: 'Specific 3'},
  {
    date: new Date('2020-05-10'),
    value: 5.883333333333334,
    trainingPhase: 'Specific 3',
  },
  {
    date: new Date('2020-05-11'),
    value: 5.816666666666666,
    trainingPhase: 'Specific 3',
  },
  {
    date: new Date('2020-05-12'),
    value: 5.666666666666667,
    trainingPhase: 'Specific 3',
  },
  {date: new Date('2020-05-13'), value: 5.85, trainingPhase: 'Specific 3'},
  {date: new Date('2020-05-14'), value: 6.0, trainingPhase: 'Specific 3'},
  {date: new Date('2020-05-15'), value: 5.4, trainingPhase: 'Specific 3'},
  {
    date: new Date('2020-05-16'),
    value: 5.216666666666667,
    trainingPhase: 'Specific 3',
  },
  {
    date: new Date('2020-05-17'),
    value: 5.733333333333333,
    trainingPhase: 'Specific 3',
  },
  {
    date: new Date('2020-05-18'),
    value: 5.383333333333334,
    trainingPhase: 'Specific 3',
  },
  {
    date: new Date('2020-05-19'),
    value: 5.916666666666667,
    trainingPhase: 'Specific 3',
  },
  {date: new Date('2020-05-20'), value: 6.0, trainingPhase: 'Specific 3'},
  {
    date: new Date('2020-05-21'),
    value: 5.933333333333334,
    trainingPhase: 'Specific 3',
  },
  {
    date: new Date('2020-05-22'),
    value: 5.616666666666666,
    trainingPhase: 'Specific 3',
  },
  {
    date: new Date('2020-05-23'),
    value: 5.033333333333333,
    trainingPhase: 'Specific 3',
  },
  {
    date: new Date('2020-05-24'),
    value: 5.716666666666667,
    trainingPhase: 'Specific 3',
  },
  {date: new Date('2020-05-25'), value: 5.85, trainingPhase: 'Specific 3'},
  {
    date: new Date('2020-05-26'),
    value: 5.866666666666666,
    trainingPhase: 'Specific 3',
  },
  {date: new Date('2020-05-27'), value: 5.8, trainingPhase: 'Specific 3'},
  {
    date: new Date('2020-05-28'),
    value: 5.633333333333334,
    trainingPhase: 'Specific 3',
  },
  {
    date: new Date('2020-05-29'),
    value: 5.833333333333333,
    trainingPhase: 'Specific 3',
  },
];

const PhaseLineGraph = ({selectedPhase}) => {
  // Dimensions
  const width = 1000;
  const graphHeight = 300; // Define a fixed height for the graph

  // Calculate the width per data point based on the total number of data points
  const someWidthPerDataPoint = width / data.length;

  // Calculate the total width of the graph
  const graphWidth = someWidthPerDataPoint * data.length;
  const padding = 50;
  // Create scales
  const xScale = scaleTime()
    .domain([data[0].date, data[data.length - 1].date])
    .range([padding, graphWidth - padding]);

  const yScale = scaleLinear()
    .domain([0, max(data, d => d.value)])
    .range([graphHeight, 0]);

  // Generate the normal line path
  const normalLine = line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.value))
    .curve(curveMonotoneX);

  // Generate the highlighted line path for the selected phase
  const highlightLine = line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.value))
    .curve(curveMonotoneX);

  // Filter the data for the selected phase
  const filteredData = data.filter(d => d.trainingPhase === selectedPhase);

  // Generate the path data for both the normal and the highlighted lines
  const normalPath = normalLine(data);
  const highlightPath = highlightLine(filteredData);

  // ScrollView ref for scrolling to specific phase
  const scrollViewRef = useRef(null);

  // Function to scroll to a specific phase
  const scrollToPhase = phaseIndex => {
    // Calculate the x position
    const position = phaseIndex * someWidthPerDataPoint;
    scrollViewRef.current.scrollTo({x: position, animated: true});
  };

  // Get the y position for the bottom of the graph (baseline for shadow)
  const bottomY = yScale(min(data, d => d.value)); // Assuming min is imported from 'd3-array'

  // Shadow path (continue the line path down to the bottomY and back to the start)
  const shadowPath = line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.value))
    .curve(curveMonotoneX)(data);

  // Find the position of the selected phase in the data array
  const phaseIndex = data.findIndex(d => d.trainingPhase === selectedPhase);
  const position = xScale(data[phaseIndex].date);

  // Scroll to the selected phase when the component updates
  useEffect(() => {
    if (phaseIndex !== -1) {
      scrollViewRef.current.scrollTo({x: position, animated: true});
    }
  }, [selectedPhase, position]);

  // Helper function to format dates as month and year
  const formatDate = date => {
    const options = {month: 'short', year: 'numeric'};
    return date.toLocaleDateString('en-US', options);
  };

  // Generate labels for the first day of each month
  const dateLabels = data
    .filter(
      (d, i, arr) =>
        i === 0 || d.date.getMonth() !== arr[i - 1].date.getMonth(),
    )
    .map(d => {
      return {
        x: xScale(d.date),
        y: graphHeight + 10, // Position the labels 20 pixels below the graph
        text: formatDate(d.date),
      };
    });

  // Reference to the ScrollView
  // Find max and min values within the selected phase
  const phaseData = data.filter(d => d.trainingPhase === selectedPhase);
  const [minValue, maxValue] = extent(phaseData, d => d.value);

  // Find positions for max and min value labels
  // Round max and min values to two decimal places
  const roundedMaxValue = maxValue.toFixed(2);
  const roundedMinValue = minValue.toFixed(2);

  const midIndex = Math.floor(filteredData.length / 2);
  const midPointData = filteredData[midIndex] ? filteredData[midIndex] : null;

  useEffect(() => {
    if (midPointData) {
      // Find the x-coordinate of the midpoint in the graph
      const midX = xScale(midPointData.date);
      // Adjust the scroll position to center the midpoint
      const halfScreenWidth = Dimensions.get('window').width / 2;
      const scrollToX = midX - halfScreenWidth;

      scrollViewRef.current.scrollTo({x: scrollToX, animated: true});
    }
  }, [selectedPhase, midPointData, xScale]);

  const theme = useTheme();

  // States for scale values
  const [zoomInScale, setZoomInScale] = useState(1);
  const [zoomOutScale, setZoomOutScale] = useState(1);

  // Animated values for gesture handling
  const scale = useSharedValue(1);

  const pinchGestureHandler = useAnimatedGestureHandler({
    onActive: event => {
      scale.value = event.scale;
    },
    onEnd: () => {
      scale.value = withSpring(1);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  // States for label positions
  const [maxLabelPosition, setMaxLabelPosition] = useState({x: 0, y: 0});
  const [minLabelPosition, setMinLabelPosition] = useState({x: 0, y: 0});

  // Shared values for animated positions
  const animatedMaxLabelX = useSharedValue(maxLabelPosition.x);
  const animatedMaxLabelY = useSharedValue(maxLabelPosition.y);
  const animatedMinLabelX = useSharedValue(minLabelPosition.x);
  const animatedMinLabelY = useSharedValue(minLabelPosition.y);

  // Update max and min label positions when phase changes
  useEffect(() => {
    const maxData = phaseData.find(d => d.value === maxValue);
    const minData = phaseData.find(d => d.value === minValue);

    if (maxData && minData) {
      const newMaxPosition = {
        x: xScale(maxData.date),
        y: yScale(maxValue) - 20,
      };
      const newMinPosition = {
        x: xScale(minData.date),
        y: yScale(minValue) + 25,
      };

      // Animate transitions
      animatedMaxLabelX.value = withTiming(newMaxPosition.x, {duration: 800});
      animatedMaxLabelY.value = withTiming(newMaxPosition.y, {duration: 800});
      animatedMinLabelX.value = withTiming(newMinPosition.x, {duration: 800});
      animatedMinLabelY.value = withTiming(newMinPosition.y, {duration: 800});

      setMaxLabelPosition(newMaxPosition);
      setMinLabelPosition(newMinPosition);
    }
  }, [selectedPhase, maxValue, minValue]);

  // Animated styles
  const animatedMaxLabelStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: animatedMaxLabelX.value},
        {translateY: animatedMaxLabelY.value},
      ],
    };
  });

  const animatedMinLabelStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: animatedMinLabelX.value},
        {translateY: animatedMinLabelY.value},
      ],
    };
  });

  const topMargin = 30; // New margin to add space at the top

  return (
    <PinchGestureHandler onGestureEvent={pinchGestureHandler}>
      <Animated.View style={animatedStyle}>
        <ScrollView
          horizontal
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          style={{flexDirection: 'row'}}>
          <Svg width={graphWidth} height={graphHeight + 50 + topMargin}>
            <G transform={`translate(0, ${topMargin})`}>
              <Defs>
                <LinearGradient
                  id="shadowGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2=".75">
                  <Stop offset="0%" stopColor="black" stopOpacity="0.2" />
                  <Stop offset="90%" stopColor="black" stopOpacity="0" />
                </LinearGradient>
              </Defs>
              <Path
                d={normalPath}
                fill="none"
                stroke="grey"
                strokeWidth={2.5}
              />

              <Path
                d={highlightPath}
                fill="none"
                stroke={theme.secondary}
                strokeWidth={3.5}
              />
              <Path
                d={`${normalPath} L ${xScale(
                  data[data.length - 1].date,
                )},${graphHeight} L ${xScale(data[0].date)},${graphHeight} Z`}
                fill="url(#shadowGradient)"
              />

              {/* Max value label */}
              {maxValue && (
                <SvgText
                  animated
                  x={xScale(phaseData.find(d => d.value === maxValue).date)}
                  y={yScale(maxValue) - 20} // Adjust Y position to not overlap the line
                  style={[
                    animatedMaxLabelStyle,
                    {
                      fontSize: 14,
                      fontWeight: 500,
                      fill: theme.primaryscale[9],
                      textAnchor: 'middle',
                    },
                  ]}>
                  {`${roundedMaxValue}hr`}
                </SvgText>
              )}

              {/* Min value label */}
              {minValue && (
                <SvgText
                  animated
                  x={xScale(phaseData.find(d => d.value === minValue).date)}
                  y={yScale(minValue) + 25} // Adjust Y position to not overlap the line
                  style={[
                    animatedMaxLabelStyle,
                    {
                      fontSize: 14,
                      fontWeight: 500,
                      fill: theme.primaryscale[9],
                      textAnchor: 'middle',
                    },
                  ]}>
                  {`${roundedMinValue}hr`}
                </SvgText>
              )}

              {dateLabels.map((label, index) => (
                <SvgText
                  key={index}
                  x={label.x}
                  y={label.y}
                  fontSize="12"
                  fill="black"
                  textAnchor="middle" // Center the text on its x coordinate
                  alignmentBaseline="hanging" // Hang the text from its y coordinate
                >
                  {label.text}
                </SvgText>
              ))}
            </G>
          </Svg>
        </ScrollView>
      </Animated.View>
    </PinchGestureHandler>
  );
};

export default PhaseLineGraph;
