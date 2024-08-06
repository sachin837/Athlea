import React, {useEffect} from 'react'
import {Svg, Rect, Text, G} from 'react-native-svg'
import * as d3 from 'd3'
import {useTheme} from 'styled-components/native'
import {View} from 'react-native'
import {useFilter} from '../../../../../contexts/FilterContext'
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated'

const formatDate = d3.timeFormat('%b %d')

const AnimatedRect = Animated.createAnimatedComponent(Rect)

const WeekRectangleLineGraph = ({data: propData, svgWidthNumber = 350}) => {
  const svgWidth = svgWidthNumber
  const svgHeight = 65
  const rectWidth = 3
  const rectHeight = 10
  const rectPadding = 0.5 // Padding between each rectangle
  const borderRadius = 2 // Border radius for each rectangle
  const leftPadding = 5 // Adjust this value to accommodate your largest label
  const rightPadding = 4 // Right padding to prevent cutting off values on the right side

  const theme = useTheme()
  const data = propData // Use prop data if available, otherwise fallback to context data

  // New right padding to provide space for y-axis labels
  const yAxisLabelRightPadding = 30

  // Adjust xScale range to add space for y-axis labels
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, d => new Date(d.date)))
    .range([leftPadding, svgWidth - rightPadding - yAxisLabelRightPadding])

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.load)])
    .range([svgHeight - rectHeight, 0])

  // Determine the min and max values for the load
  const minValue = d3.min(data, d => d.load)
  const maxValue = d3.max(data, d => d.load)

  // Increase SVG width to accommodate y-axis labels
  const svgWidthWithLabels = svgWidth + yAxisLabelRightPadding

  const startingYs =
    data && data.length > 0 ? data.map(() => useSharedValue(svgHeight)) : []

  useEffect(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log('No data available for animation')
      return // Exit if data is not ready
    }

    // Animate to final positions
    data.forEach((d, index) => {
      const finalY = yScale(d.load)
      startingYs[index].value = withTiming(finalY, {
        duration: 1000,
        easing: Easing.out(Easing.quad),
      })
    })
  }, [data, yScale])

  return (
    <View>
      <Svg width={svgWidthWithLabels} height={svgHeight}>
        <G>
          {data.map((d, index) => {
            const finalX =
              xScale(new Date(d.date)) - rectWidth / 2 + index * rectPadding

            // Use animated props for the y attribute
            const animatedProps = useAnimatedProps(() => ({
              y: startingYs[index].value,
              // x is fixed at its final position
              x: finalX,
            }))

            return (
              <AnimatedRect
                key={d.date}
                animatedProps={animatedProps}
                width={rectWidth}
                height={rectHeight}
                fill={theme.secondary}
                rx={borderRadius}
                ry={borderRadius}
              />
            )
          })}
          <Text
            x={xScale(new Date(data[0].date))}
            y={svgHeight}
            fontSize="12"
            fill="black"
            fontWeight={500}
            textAnchor="start">
            {formatDate(new Date(data[0].date))}
          </Text>
          <Text
            x={xScale(new Date(data[data.length - 1].date)) + 16}
            y={svgHeight}
            fontSize="12"
            fill="black"
            fontWeight={500}
            textAnchor="end">
            {formatDate(new Date(data[data.length - 1].date))}
          </Text>
        </G>
        <G>
          <Text
            x={svgWidth - rightPadding + 20} // Position to the right of the main graph area
            y={yScale(minValue) + 20} // Move the min value up slightly to prevent alignment with the bottom
            fontSize="12"
            fill={theme.primary} // Assuming primary is the color you want
            textAnchor="end" // Anchor text to the end
          >
            {`${minValue}`}
          </Text>
          <Text
            x={svgWidth - rightPadding + 20} // Position to the right of the main graph area
            y={yScale(maxValue) + 10} // Move the max value down slightly to prevent it from being cut off
            fontSize="12"
            fill={theme.primary} // Assuming primary is the color you want
            textAnchor="end" // Anchor text to the end
          >
            {`${maxValue}`}
          </Text>
        </G>
      </Svg>
    </View>
  )
}

export default WeekRectangleLineGraph
