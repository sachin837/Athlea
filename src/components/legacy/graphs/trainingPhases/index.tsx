import React, {useEffect, useRef, useState} from 'react';
import {Svg, Rect, Text, G, Polygon} from 'react-native-svg';
import * as d3 from 'd3';
import {useTheme} from 'styled-components/native';
import {Button, ScrollView, View, PanResponder} from 'react-native';
import {Icon} from '../../response/response.style.tsx';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const formatDate = d3.timeFormat('%b, %d, %Y');

const formatToSimpleDate = date => {
  return date.toISOString().split('T')[0]; // Splits the ISO string at 'T' and returns the date part
};

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const TrainingPhaseGraph = ({
  openBottomSheet,
  currentDate,
  setCurrentDate,
  data,
  phaseColor,
}) => {
  // Slice the data to only include the first 40 entries
  const formattedCurrentDate = formatToSimpleDate(new Date(currentDate));
  const initialPhase = data.find(d => d.date === formattedCurrentDate)?.phase;
  const [currentPhase, setCurrentPhase] = useState(initialPhase); // Initialize with the first phase
  // Determine the initial indices for slicing the data to show 40 items
  const initialIndex = data.findIndex(d => d.date === currentDate);
  const initialStartIndex = Math.max(0, initialIndex - 20);
  const initialEndIndex = Math.min(data.length, initialStartIndex + 40);
  const [isDragging, setIsDragging] = useState(false);
  const initialDateRef = useRef({
    date: currentDate,
    x: null, // We will set this once we have the xScale set up
  });

  console.log('Training phase data', data);

  useEffect(() => {
    // Set the initial X position once the xScale is ready
    if (xScale && initialDateRef.current.date === currentDate) {
      const xPosition =
        xScale(formatToSimpleDate(new Date(currentDate))) +
        xScale.bandwidth() / 2;
      initialDateRef.current.x = xPosition;
    }
  }, [xScale, currentDate]);

  const [visibleData, setVisibleData] = useState(
    data.slice(initialStartIndex, initialEndIndex),
  );
  const scrollViewRef = useRef();

  const [initialTouchX, setInitialTouchX] = useState(null);

  // Assuming you have a way to calculate the index of the current date within the visibleData array
  const currentDateIndex = visibleData.findIndex(
    d => d.date === formatToSimpleDate(new Date(currentDate)),
  );

  const initialDatePanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Reset to the initial date
        setCurrentDate(initialDateRef.current.date);
      },
    }),
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: evt => {
        const initialX = evt.nativeEvent.locationX;
        setInitialTouchX(initialX);
        setIsDragging(true); // Start dragging
      },
      onPanResponderMove: (evt, gestureState) => {
        // Ensure we have an initial touch position to compare against
        if (initialTouchX == null) return;

        const movedX = evt.nativeEvent.locationX;
        const distanceMoved = movedX - initialTouchX;

        // Define a threshold for how far the user needs to drag to change the date
        const dragThreshold = svgWidth / visibleData.length; // Adjust this value as needed

        if (Math.abs(distanceMoved) >= dragThreshold) {
          // Calculate the direction of the drag (+1 for right, -1 for left)
          const direction = distanceMoved > 0 ? 1 : -1;

          // Find the current date index
          const currentDateIndex = visibleData.findIndex(
            d => d.date === formatToSimpleDate(new Date(currentDate)),
          );

          // Calculate the new index based on the direction of the drag
          let newIndex = currentDateIndex + direction;
          // Ensure the new index stays within bounds
          newIndex = Math.max(0, Math.min(newIndex, visibleData.length - 1));

          // Update the currentDate based on the new index
          const newDate = visibleData[newIndex].date;
          if (newDate) {
            setCurrentDate(new Date(newDate).toISOString());
            // Reset the initial touch position for the next drag
            setInitialTouchX(movedX);
          }
        }
      },
      onPanResponderRelease: () => {
        setIsDragging(false); // Stop dragging
      },
      onPanResponderTerminate: () => {
        setIsDragging(false); // Stop dragging in case of interruption
      },
    }),
  );

  const [scrollPosition, setScrollPosition] = useState(0);
  const svgWidth = 362; // Adjusted for scrolling
  const svgHeight = 100;
  const additionalHeight = 45; // Extra height for the label
  const totalSvgHeight = svgHeight + additionalHeight; // Total SVG height including space for the label
  const barPadding = 0.2;
  useEffect(() => {
    updateVisibleData(currentPhase);
  }, [currentPhase]);

  const navigatePhase = direction => {
    const uniquePhases = [...new Set(data.map(item => item.phase))];
    let currentPhaseIndex = uniquePhases.indexOf(currentPhase);

    if (direction === 'next') {
      currentPhaseIndex = (currentPhaseIndex + 1) % uniquePhases.length;
    } else if (direction === 'prev') {
      currentPhaseIndex =
        (currentPhaseIndex - 1 + uniquePhases.length) % uniquePhases.length;
    }

    const newPhase = uniquePhases[currentPhaseIndex];
    setCurrentPhase(newPhase);
    updateVisibleData(newPhase);
  };

  const updateVisibleData = phase => {
    // Find indices of data points belonging to the new phase
    const phaseDataIndices = data.reduce((acc, item, index) => {
      if (item.phase === phase) acc.push(index);
      return acc;
    }, []);

    let start = Math.max(0, Math.min(...phaseDataIndices) - 20);
    let end = Math.min(data.length, Math.max(...phaseDataIndices) + 20);
  };

  const maxValue = d3.max(data, d => d.load);
  const xScale = d3
    .scaleBand()
    .domain(visibleData.map(d => d.date))
    .range([0, svgWidth])
    .padding(barPadding);
  const yScale = d3.scaleLinear().domain([0, maxValue]).range([svgHeight, 0]);

  const theme = useTheme();

  const currentPhaseData = data.find(d => d.date === formattedCurrentDate);
  console.log('currentPhaseData', currentPhaseData);

  const currentPhaseX = currentPhaseData
    ? xScale(currentPhaseData.date) + xScale.bandwidth() / 2
    : 0;

  useEffect(() => {
    const phaseDataIndices = data.reduce((acc, item, index) => {
      if (item.phase === currentPhase) {
        acc.push(index);
      }
      return acc;
    }, []);

    if (phaseDataIndices.length > 0) {
      let start = Math.max(0, phaseDataIndices[0] - 20);
      let end = Math.min(
        data.length,
        phaseDataIndices[phaseDataIndices.length - 1] + 20,
      );
    }
  }, [currentPhase]);

  const phaseDates = data
    .filter(d => d.phase === currentPhase)
    .map(d => d.date);
  const phaseStartX = xScale(phaseDates[0]) + xScale.bandwidth() / 2;
  const phaseEndX =
    xScale(phaseDates[phaseDates.length - 1]) + xScale.bandwidth() / 2;
  const phaseCenterX = (phaseStartX + phaseEndX) / 2;
  const uniquePhases = [...new Set(data.map(item => item.phase))];
  const currentPhaseIndex = uniquePhases.indexOf(currentPhase);
  console.log('Current Phase Index:', currentPhaseIndex);
  console.log('Navigating to Phase:', uniquePhases[currentPhaseIndex]);

  const polygonX = currentPhaseX - 10; // Example starting X position
  const polygonY = yScale(maxValue); // Example Y position
  const polygonWidth = 20; // Example width
  const polygonHeight = 20; // Example height

  useEffect(() => {
    panResponder.current = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: evt => {
        const initialX = evt.nativeEvent.locationX;
        setInitialTouchX(initialX);
        setIsDragging(true); // Start dragging
      },
      onPanResponderMove: (evt, gestureState) => {
        // Adjust moveX based on your layout's padding/margin if necessary

        const adjustedMoveX = gestureState.moveX; // This might need adjustment

        // Convert the adjustedMoveX position to a date using the inverse of the xScale
        // Since xScale is designed to map dates to x positions, we need its inverse
        const xScaleInverse = d3
          .scaleQuantize()
          .domain([0, svgWidth])
          .range(visibleData.map(d => d.date));

        // Find the closest date to the current drag position
        const closestDate = xScaleInverse(adjustedMoveX);

        if (closestDate) {
          // Update your currentDate state to this new date
          setCurrentDate(new Date(closestDate).toISOString());

          // Find the phase of the new date
          const newPhase = data.find(d => d.date === closestDate)?.phase;

          // If the phase is different from the current phase, update it
          if (newPhase && newPhase !== currentPhase) {
            setCurrentPhase(newPhase);
          }
        }
      },
      onPanResponderRelease: () => {
        setIsDragging(false); // Stop dragging
      },
      onPanResponderTerminate: () => {
        setIsDragging(false); // Stop dragging in case of interruption
      },
    });
  }, [visibleData, svgWidth, setCurrentDate, xScale, isDragging]);

  const animatedHeights = data.map(() => useSharedValue(0));

  const animatedCompletedHeights = data.map(item => useSharedValue(0));

  useEffect(() => {
    // Animate each bar's height for the expected load
    animatedHeights.forEach((animatedHeight, index) => {
      const barHeight = yScale(0) - yScale(data[index].load);
      animatedHeight.value = withTiming(barHeight, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
    });

    animatedCompletedHeights.forEach((height, index) => {
      // Calculate the target height based on the completedLoad to load ratio
      const targetHeight =
        (data[index].completedLoad / data[index].load) *
        (svgHeight - yScale(data[index].load));
      height.value = withTiming(targetHeight, {
        duration: 500, // Customize the animation duration
        easing: Easing.out(Easing.exp), // Customize the easing function
      });
    });
  }, [data, yScale, animatedHeights]);

  // Original y value for the top point of the polygon
  const originalTopY = yScale(maxValue) + 20;

  // Calculate new y values by subtracting the desired move-up amount
  const moveUpAmount = 20;
  const newTopY = originalTopY - moveUpAmount;
  const newBaseY = yScale(maxValue) - moveUpAmount;

  // Adjusted points for the first polygon (for example, associated with initialDateRef)
  const adjustedInitialPolygonPoints = `
    ${initialDateRef.current.x},${newTopY}
    ${initialDateRef.current.x - 10},${newBaseY}
    ${initialDateRef.current.x + 10},${newBaseY}`;

  // Adjusted points for the second polygon
  const adjustedPolygonPoints = `
    ${currentPhaseX},${newTopY}
    ${currentPhaseX - 10},${newBaseY}
    ${currentPhaseX + 10},${newBaseY}`;

  // Check if current phase is the first or last
  const isFirstPhase = currentPhaseIndex === 0;
  const isLastPhase = currentPhaseIndex === uniquePhases.length - 1;
  return (
    <Svg width={svgWidth} height={totalSvgHeight}>
      {/* Rectangles for bars */}
      {data.map((item, index) => {
        const barHeight = yScale(0) - yScale(item.load);
        const isSelectedDate = item.date === formattedCurrentDate;
        const isCurrentPhase = item.phase === currentPhase;
        let fill = 'grey'; // Default color
        if (isSelectedDate) {
          fill = theme.primaryscale[3];
        } else if (isCurrentPhase) {
          fill = phaseColor;
        }
        // Calculate x position and width for each bar
        const barX = xScale(item.date);
        const barWidth = xScale.bandwidth();

        // Default opacity is 1; it becomes 0.4 for non-selected dates when dragging
        let opacity = isSelectedDate || !isDragging ? 1 : 0.4;

        // Animated props for each rectangle
        const animatedProps = useAnimatedProps(() => ({
          height: animatedHeights[index].value,
          y: svgHeight - animatedHeights[index].value, // Adjust based on your yScale and graph layout
        }));

        // Conditional rendering for the overlay
        const animatedCompletedProps = useAnimatedProps(() => {
          // Height based on the ratio of completedLoad to load
          const heightRatio = item.completedLoad / item.load;
          const overlayHeight = animatedHeights[index].value * heightRatio;

          return {
            height: overlayHeight,
            y:
              svgHeight -
              animatedHeights[index].value +
              (animatedHeights[index].value - overlayHeight), // Adjust so it starts from the bottom of the bar
          };
        });

        return (
          <>
            <AnimatedRect
              key={item.date}
              x={xScale(item.date)}
              width={xScale.bandwidth()}
              fill={fill}
              rx="4"
              ry="4"
              animatedProps={animatedProps}
              opacity={opacity}
            />
            {isSelectedDate && (
              <AnimatedRect
                x={barX}
                width={barWidth}
                fill={theme.third} // Color for the completed load overlay, suggesting progress or completion
                animatedProps={animatedCompletedProps}
                rx="2" // Optional: adds rounded corners for the overlay as well
              />
            )}
          </>
        );
      })}

      {/* Label for the current phase */}
      {currentPhase && (
        <Text
          x={phaseCenterX}
          y={svgHeight + 20} // Make sure this positions the text within the additionalHeight space
          fontSize="14"
          fill="black"
          fontWeight="600"
          textAnchor="middle">
          {currentPhase}
        </Text>
      )}

      {initialDateRef.current.x && (
        <Polygon
          points={adjustedInitialPolygonPoints}
          transform={{translateY: 14}}
          opacity={0.5}
          fill="grey" // Different color to distinguish it from the draggable marker
          {...initialDatePanResponder.panHandlers}
        />
      )}

      <Polygon
        points={adjustedPolygonPoints}
        fill="grey"
        transform={{translateY: 14}}
        fill={theme.third}
        {...panResponder.current.panHandlers}
      />

      <Text
        x={0} // Start of the SVG
        y={svgHeight + 30} // Position just below the graph
        fontSize="12"
        fill="black"
        fontWeight="500"
        textAnchor="start">
        {formatDate(new Date(visibleData[0].date))}
      </Text>
      <Text
        x={svgWidth} // End of the SVG
        y={svgHeight + 30} // Position just below the graph
        fontSize="12"
        fill="black"
        fontWeight="500"
        textAnchor="end">
        {formatDate(new Date(visibleData[visibleData.length - 1].date))}
      </Text>
    </Svg>
  );
};

export default TrainingPhaseGraph;
