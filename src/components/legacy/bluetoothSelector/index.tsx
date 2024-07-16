import {View, Text, Dimensions} from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  BrandIcon,
  BrandName,
  StyledContainer,
  WatchImage,
  WatchName,
} from './Bluetooth.style.tsx'
import {ScrollView} from 'react-native'
import {FlatList} from 'react-native'
import {TouchableOpacity} from 'react-native'
import brandWatchListData from './brandWatchList.json'
import {useDispatch} from 'react-redux'
import {showNotification} from '../../../store/notifications'
import AppleHealthKit, {HealthKitPermissions} from 'react-native-health'

const brandWatchList: Brand[] = brandWatchListData as Brand[]

type Watch = {
  name: string;
  image: string;
  isSelected: boolean;
};

export type WatchWithBrand = {
  name: string;
  brand: string;
};

export type ImageType = {
  [key: string]: any;
};

export type IconType = {
  [key: string]: any;
};

type Brand = {
  name: string;
  icon: string;
  watches: Watch[];
};

type BluetoothSelectionViewProps = {
  selectedWatches: WatchWithBrand[];
  setSelectedWatches: React.Dispatch<React.SetStateAction<WatchWithBrand[]>>;
};

const images: ImageType = {
  'AppleWatchSeries1.png': require('../../../assets/images/AppleWatchSeries1.png'),
  'AppleWatchSeries2.png': require('../../../assets/images/AppleWatchSeries2.png'),
  'AppleWatchSeries3.png': require('../../../assets/images/AppleWatchSeries3.png'),
  'FitbitVersa2.png': require('../../../assets/images/FitbitVersa2.png'),
  'FitbitVersa3.png': require('../../../assets/images/FitbitVersa3.png'),
  'FitbitVersa4.png': require('../../../assets/images/FitbitVersa4.png'),
  'Garmin_HRMRUN_Sensor1.png': require('../../../assets/images/Garmin_HRMRUN_Sensor1.png'),
  'Forerunner265.png': require('../../../assets/images/Forerunner265.png'),
  'Venu3s.png': require('../../../assets/images/Venu3s.png'),
  'vivoactive5.png': require('../../../assets/images/vivoactive5.png'),
}

const icons: IconType = {
  'Apple.png': require('../../../assets/images/Apple.png'),
  'Garmin.png': require('../../../assets/images/Garmin.png'),
  'Fitbit.png': require('../../../assets/images/Fitbit.png'),
}

const BluetoothSelectionComp = ({
  selectedWatches,
  setSelectedWatches,
  customImageSize,
  updateUserProfile,
}: BluetoothSelectionViewProps) => {
  const dispatch = useDispatch() // Use useDispatch hook to dispatch actions

  const initHealthKit = () => {
    const permissions = {
      permissions: {
        read: [
          AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
          AppleHealthKit.Constants.Permissions.AppleExerciseTime,
          AppleHealthKit.Constants.Permissions.AppleStandTime,
          AppleHealthKit.Constants.Permissions.ActivitySummary,
          AppleHealthKit.Constants.Permissions.HeartRate,
          AppleHealthKit.Constants.Permissions.RestingHeartRate,
          AppleHealthKit.Constants.Permissions.WalkingHeartRateAverage,
          AppleHealthKit.Constants.Permissions.HeartRateVariability,
          AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
          AppleHealthKit.Constants.Permissions.Workout,
          AppleHealthKit.Constants.Permissions.StepCount,
          AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
          AppleHealthKit.Constants.Permissions.DistanceCycling,
          AppleHealthKit.Constants.Permissions.DistanceSwimming,
          AppleHealthKit.Constants.Permissions.BodyMass,
          AppleHealthKit.Constants.Permissions.BodyMassIndex,
          AppleHealthKit.Constants.Permissions.LeanBodyMass,
          AppleHealthKit.Constants.Permissions.SleepAnalysis,
          AppleHealthKit.Constants.Permissions.Vo2Max,
          AppleHealthKit.Constants.Permissions.FlightsClimbed,
        ],
        write: [
          /* write permissions if any */
        ],
      },
    } as HealthKitPermissions

    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      if (error) {
        console.error('[ERROR] Cannot grant HealthKit permissions!', error)
        return
      }
      // HealthKit is initialized
      console.log('HealthKit initialized!')
      // Here you can add further logic to read data from HealthKit
    })
  }

  const screenWidth = Dimensions.get('window').width
  const handleSelectWatch = (watchWithBrand: WatchWithBrand) => {
    if (
      selectedWatches.some(selected => selected.name === watchWithBrand.name)
    ) {
      setSelectedWatches(
        selectedWatches.filter(
          selected => selected.name !== watchWithBrand.name,
        ),
      )
    } else {
      setSelectedWatches([...selectedWatches, watchWithBrand])
      // If the watch brand is Apple, initialize HealthKit
      if (watchWithBrand.brand === 'Apple') {
        initHealthKit()
      }
    }

    // Adjust the logic to use 'apple' or 'garmin' directly as the type
    let notificationType
    if (watchWithBrand.name.includes('Series 3')) {
      notificationType = 'apple' // Directly use 'apple' as the type
    } else if (watchWithBrand.name.includes('Garmin HRM1')) {
      notificationType = 'garmin' // Directly use 'garmin' as the type
    }

    // If a specific device type is determined, dispatch the notification with that type
    if (notificationType) {
      console.log('Notification Type:', notificationType)
      dispatch(
        showNotification({
          message: {
            boldPart: `${watchWithBrand.name}`,
            normalPart: 'is now paired successfully.',
          },
          type: notificationType, // Use the specific device type directly
        }),
      )
    }
  }

  const isWatchSelected = (watchName: string) => {
    return selectedWatches.some(watch => watch.name === watchName)
  }

  return (
    <StyledContainer>
      <ScrollView style={{flex: 1, width: screenWidth}}>
        {brandWatchListData.map((brand: Brand, brandIndex: number) => (
          <View key={brandIndex} style={{marginBottom: 30}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <BrandIcon source={icons[brand.icon]} />
              <BrandName>{brand.name}</BrandName>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={brand.watches}
              style={{marginBottom: 10}}
              contentContainerStyle={{alignItems: 'center'}}
              renderItem={({item}) => {
                const isGarminHRM1 = item.image === 'Garmin_HRMRUN_Sensor1.png'
                const imageStyle = isGarminHRM1
                  ? {
                    width: customImageSize?.width,
                    height: customImageSize?.height,
                    marginTop: 30,
                    marginBottom: 14,
                  } // Assuming you want to add 20 as the additional margin
                  : {}

                return (
                  <TouchableOpacity
                    onPress={() =>
                      handleSelectWatch({name: item.name, brand: brand.name})
                    }
                    style={{
                      marginRight: 30,
                      marginBottom: isGarminHRM1 ? 0 : 10,
                      marginTop: isGarminHRM1 ? 0 : 10,
                    }}>
                    <WatchImage
                      source={images[item.image]}
                      // Keep the opacity of the image constant
                      style={[
                        {
                          opacity: 1, // Keep the opacity of the image constant
                          // Other styles...
                        },
                        imageStyle,
                      ]}
                    />
                    <WatchName
                      style={{
                        color: isWatchSelected(item.name) ? '#F94A8C' : '#000',
                      }}>
                      {item.name}
                    </WatchName>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
        ))}
      </ScrollView>
    </StyledContainer>
  )
}

export default BluetoothSelectionComp
