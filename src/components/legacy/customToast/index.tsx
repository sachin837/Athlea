import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {Icon} from '../response/response.style.tsx';
import {PageButton} from '../pageButton';
import {useTheme} from 'styled-components/native';

const AppleWatchImage = require('../../../assets/images/AppleWatchSeries3.png');
const GarminHRMImage = require('../../../assets/images/Garmin_HRMRUN_Sensor1.png');
// Should log an object if the path is correct
const CustomToast = ({message, type, props}) => {
  const theme = useTheme();
  console.log('Props:', props);

  const typeToIconAndTitle = {
    custom: {iconName: 'athleaiconsvg', title: 'Athlea'},
    recovery: {
      iconName: 'recoveryicon',
      title: 'Recovery',
      iconSize: 3,
      gradientColors: theme.gradients.recovery.colors,
    },
    nutrition: {
      iconName: 'nutritionicon',
      title: 'Nutrition',
      iconSize: 3,

      gradientColors: theme.gradients.nutrition.colors,
    },
    wellbeing: {
      iconName: 'wellbeingicon',
      title: 'Wellbeing',
      iconSize: 3,

      gradientColors: theme.gradients.wellbeing.colors,
    },
    strength: {
      iconName: 'strengthicon',
      title: 'Strength',
      iconSize: 2,

      gradientColors: theme.gradients.strength.colors,
    },
    endurance: {
      iconName: 'enduranceicon',
      title: 'Endurance',
      iconSize: 3,

      gradientColors: theme.gradients.endurance.colors,
    },
    apple: {
      image: AppleWatchImage,
      title: 'Apple Watch',
    },
    garmin: {
      image: GarminHRMImage,
      title: 'Garmin HRM',
    },
  };
  let content;
  const deviceInfo = typeToIconAndTitle[type];

  // Handle device-specific types with images
  if (deviceInfo?.image) {
    content = (
      <>
        <Image source={deviceInfo.image} style={styles.image} />
      </>
    );
  } else if (type === 'custom' && deviceInfo?.title === 'Athlea') {
    // Handle 'Athlea' specifically if needed
    content = <Icon name={deviceInfo.iconName} size={34} color="black" />;
  } else {
    // Handle other notification types
    const {iconName, title, gradientColors, iconSize} =
      deviceInfo || typeToIconAndTitle.custom;
    content = (
      <PageButton
        name={iconName}
        size={10}
        iconSize={iconSize}
        gradientColors={gradientColors}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.pageButtonContainer}>{content}</View>
      <View style={styles.textContainer}>
        <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
          <Text style={{fontWeight: 'bold'}}>{props.message?.boldPart}</Text>
          {props.message?.normalPart && ' '}
          <Text>{props.message?.normalPart}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 7,
    paddingVertical: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: Dimensions.get('window').width - 32,
    height: 80,
    borderColor: 'black',
    elevation: 3,
    borderRadius: 10,
  },
  pageButtonContainer: {
    paddingLeft: 0,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 40,
    height: 40,
  },

  textContainer: {
    paddingLeft: 12,
    alignItems: 'flex-start',
    width: '82%',
  },
  // Add more styles as needed
});

export default CustomToast;
