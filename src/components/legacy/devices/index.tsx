import {View, Text} from 'react-native';
import React from 'react';
import DeviceField from '../device';
import {Container} from './devices.style.tsx';

const DeviceList = ({ShowAppleWatch = true, ShowGarmin = true}) => {
  return (
    <Container>
      {ShowAppleWatch && (
        <DeviceField DeviceName="" DeviceImageName="AppleWatchSeries31" />
      )}
      {ShowGarmin && (
        <DeviceField
          DeviceName=""
          DeviceImageName="Garmin_HRMRUN_Sensor1"
          DeviceWidth={30}
          DeviceHeight={30}
        />
      )}
    </Container>
  );
};

export default DeviceList;
