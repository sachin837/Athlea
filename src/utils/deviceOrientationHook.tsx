import {Dimensions, ScaledSize} from 'react-native';
import DeviceInfo from 'react-native-device-info';

// Get the dimensions once and assume they won't change.
const {width, height} = Dimensions.get('screen');

let screenDimensions = Dimensions.get('screen');

export const isLandscape = () => {
  return screenDimensions.width >= screenDimensions.height;
};

const updateDimensions = (dims: {window: ScaledSize; screen: ScaledSize}) => {
  screenDimensions = dims.screen;
};

Dimensions.addEventListener('change', updateDimensions);

export const deviceType = DeviceInfo.isTablet() ? 'tablet' : 'handset';

function ruleOfThree(
  comparisonValue: string | number,
  baseValue: number,
): number {
  let value =
    typeof comparisonValue === 'string'
      ? parseFloat(comparisonValue.replace('%', ''))
      : comparisonValue;

  if (isNaN(value)) return 0; // Fallback to 0 if value is not a number.

  return (baseValue * value) / 100;
}
export const widthPercentageToDP = (value: string | number): number => {
  const realWidth = isLandscape()
    ? Math.max(width, height)
    : Math.min(width, height);
  const result = ruleOfThree(value, realWidth);
  return Math.round(result); // Round the result to the nearest whole number
};

export const heightPercentageToDP = (value: string | number): number => {
  const realHeight = isLandscape()
    ? Math.min(width, height)
    : Math.max(width, height);
  const result = ruleOfThree(value, realHeight);
  return Math.round(result); // Round the result to the nearest whole number
};
