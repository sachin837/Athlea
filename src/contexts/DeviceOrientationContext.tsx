import React, {FC, createContext, useEffect, ReactNode, useState} from 'react'
import {Dimensions} from 'react-native'
import {isLandscape} from '../utils/deviceOrientationHook'
import {
  deviceOrientationTypes,
  DeviceOrientationValue,
  deviceInfoTypes,
} from './types'

const DeviceOrientationContext = createContext<DeviceOrientationValue>({
  deviceOrientation: 'portrait',
  screenFraction: 0,
  calculateAspectRatio: () => Promise.resolve(),
})

interface DeviceOrientatioProps {
  children: ReactNode;
}

export const DeviceOrientationProvider: FC<DeviceOrientatioProps> = ({
  children,
}) => {
  const deviceOrientation = isLandscape ? 'landscape' : 'portrait'
  const dim = Dimensions.get('screen')
  const calculateScreenFraction = isLandscape
    ? dim?.height / dim?.width
    : dim?.width / dim?.height
  const [deviceInfo, setDeviceInfo] = useState<deviceInfoTypes>({
    deviceOrientation,
    screenFraction: calculateScreenFraction,
  })
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        if (screen?.width > screen?.height) {
          setDeviceInfo({
            deviceOrientation: 'landscape',
            screenFraction: screen?.height / screen?.width,
          })
        } else {
          setDeviceInfo({
            deviceOrientation: 'portrait',
            screenFraction: screen?.width / screen?.height,
          })
        }
      },
    )
    return () => subscription?.remove()
  }, [])

  const calculateAspectRatio = (
    widthRatio: number,
    heightRatio: number,
    orientationBase: deviceOrientationTypes = 'portrait',
  ) => {
    const mainSide = orientationBase === 'portrait' ? widthRatio : heightRatio
    const secondarySide =
      orientationBase === 'portrait' ? heightRatio : widthRatio
    const dynamicHeightRatio =
      deviceInfo.deviceOrientation === 'portrait'
        ? 1
        : deviceInfo.screenFraction
    return mainSide / (secondarySide * dynamicHeightRatio)
  }

  return (
    <DeviceOrientationContext.Provider
      value={{...deviceInfo, calculateAspectRatio}}>
      {children}
    </DeviceOrientationContext.Provider>
  )
}

export default DeviceOrientationContext
