import {useContext} from 'react'
import DeviceOrientationContext from '../contexts/DeviceOrientationContext'

const useDeviceOrientation = () => useContext(DeviceOrientationContext)

export default useDeviceOrientation
