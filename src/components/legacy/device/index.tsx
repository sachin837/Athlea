import React from 'react';
import {View, Text, Image} from 'react-native';
import {Container, DeviceText} from './device.style.tsx';

// Define a mapping from image names or identifiers to actual require statements
const imageAssets = {
  AppleWatchSeries31: require('../../../assets/images/AppleWatchSeries31.png'),
  Garmin_HRMRUN_Sensor1: require('../../../assets/images/Garmin_HRMRUN_Sensor1.png'),
};

const DeviceField = ({
  DeviceName,
  DeviceImageName,
  DeviceWidth = 20,
  DeviceHeight = 20,
}) => {
  // Access the correct image from the mapping
  const imageSource = imageAssets[DeviceImageName];

  return (
    <Container>
      {imageSource && (
        <Image
          source={imageSource}
          style={{
            width: DeviceWidth,
            height: DeviceHeight,
            resizeMode: 'contain',
          }}
        />
      )}
      <DeviceText>{DeviceName}</DeviceText>
    </Container>
  );
};

export default DeviceField;
