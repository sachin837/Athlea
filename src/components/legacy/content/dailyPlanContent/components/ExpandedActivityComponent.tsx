import {View, Text, StyleSheet, Image, Button} from 'react-native'
import React, {useEffect, useState} from 'react'
import ResponseBarGraph from '../../../graphs/graphPlusHeader/components/ResponseBarGraph'
import TSSGraph from '../../../graphs/tssGraph'
import LoadGraph from '../../../graphs/loadGraph'
import ProgressRingBlock from './ProgressRingBlock'
import ImageGallery from '../../../imageGallery'
import {bodyMap} from '../../../../screens/TrainingPlan/TrainingPlan'
import LoadingIndicator from '../../../loading'
import {useTheme} from 'styled-components/native'
import {widthPercentageToDP} from '../../../../../utils/deviceOrientationHook'

const contentList = [
  {
    type: 'gif',
    title: 'Interesting GIF',
    url: 'https://www.google.com',
    src: {
      uri: 'https://c02.purpledshub.com/uploads/sites/39/2021/02/ezgif.com-gif-maker-1-541bfa6.gif',
    },
  },
  {
    type: 'article',
    title: 'Interesting Article',
    summary: 'Summary of the article...',
    thumbnail: {
      uri: 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_2240/https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_300/https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1024/https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_768/https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1536/https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_2048/https://inscyd.com/wp-content/uploads/2023/11/Infographic-The-Ultimate-Guide-to-Zone-4-Training-.png',
    },
    url: 'https://www.google.com',
  },
  {
    type: 'article',
    title: 'Interesting Article',
    summary: 'Summary of the article...',
    thumbnail: {
      uri: 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_2240/https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_300/https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1024/https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_768/https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1536/https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_2048/https://inscyd.com/wp-content/uploads/2023/11/Infographic-The-Ultimate-Guide-to-Zone-4-Training-.png',
    },
    url: 'https://www.google.com',
    showMore: true,
  },
]

const ExpandedActivityComponent = ({
  activityHeader1,
  activityLabel1,
  activityValue1,
  graphData1,
  activityHeader2,
  activityLabel2,
  activityValue2,
  graphData2,
  graphDescription,
  graphDescription2,
  selectedBodyPartImage,
  selectedActivityText,
  isCategoryLoaded,
}: {
  activityHeader1: string;
  activityLabel1: string;
  activityValue1: string;
  graphData1: any;
  activityHeader2: string;
  activityLabel2: string;
  activityValue2: string;
  graphData2: any;
  graphDescription: string;
  graphDescription2: string;
  selectedBodyPartImage: string;
  selectedActivityText: string;
  isCategoryLoaded: boolean;
}) => {
  console.log('graphData1', graphData1)
  console.log('graphData2', graphData2)
  const theme = useTheme()
  // State to manage whether the loading indicator should be shown
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Set a timer to hide the loading indicator after 1000 milliseconds
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Cleanup the timer when the component unmounts or if the effect re-runs
    return () => clearTimeout(timer)
  }, []) // Empty dependency array means this effect runs only once on mount

  if (isLoading) {
    // Show the loading indicator while loading
    return (
      <View style={styles.centered}>
        <LoadingIndicator />
      </View>
    )
  }

  return (
    <View>
      <View>
        <View
          style={{
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 10,
            backgroundColor: theme.primaryscale[2],
            padding: 10,
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={bodyMap[selectedBodyPartImage]}
              style={{width: 70, height: 90, marginRight: 12}}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.activityHeader}>{selectedActivityText}</Text>
              <Text>Updated 1 minute ago</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 90,
                  marginTop: 14,
                }}>
                <Text style={[styles.buttonText, {color: '#5390DF'}]}>
                  Edit
                </Text>
                <Text style={styles.buttonText}>Delete</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        <Text style={[styles.activityHeader]}>Images</Text>
        <Text style={[styles.description]}>
          *Images of the activity or related articles
        </Text>
        <View
          style={{
            marginTop: 20,
          }}>
          <ImageGallery contents={contentList} />
        </View>
      </View>
      <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
        {activityHeader2 && activityLabel2 && activityValue2 && (
          <>
            <View style={styles.activityContainer}>
              <View>
                <Text style={styles.activityHeader}>{activityHeader2}</Text>
                <Text style={styles.description}>*{graphDescription}</Text>
              </View>
              <View style={styles.activityValueContainer}>
                <Text style={styles.activityValue}>{activityValue2}</Text>
                <Text style={styles.activityLabel}>{activityLabel2}</Text>
              </View>
            </View>
            <TSSGraph data={graphData1} />
          </>
        )}
      </View>
      <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
        {activityHeader1 && activityLabel1 && (
          <>
            <View style={styles.activityContainer}>
              <View>
                <Text style={styles.activityHeader}>{activityHeader1}</Text>
                <Text style={styles.description}>*{graphDescription2}</Text>
              </View>
              <View style={styles.activityValueContainer}>
                <Text style={styles.activityValue}>{activityValue1}</Text>
                <Text style={styles.activityLabel}>{activityLabel1}</Text>
              </View>
            </View>
            <LoadGraph data={graphData2} />
          </>
        )}
      </View>
      <View>
        <Text style={[styles.activityHeader, {paddingHorizontal: 20}]}>
          Body Impact
        </Text>
        <Text style={[styles.description, {paddingHorizontal: 20}]}>
          *How this activity impacts your body
        </Text>
        <ProgressRingBlock />
      </View>
    </View>
  )
}

export default ExpandedActivityComponent

const styles = StyleSheet.create({
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  activityHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#575757',
    width: widthPercentageToDP(66),
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  imagesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#575757',
    paddingBottom: 20,
  },
  activityValueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  activityValue: {
    fontSize: 22,
    color: 'black',
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#575757',
    paddingBottom: 5,
  },
  activityLabel: {
    fontSize: 14,
    color: '#575757',
    paddingLeft: 3,
    paddingBottom: 1,
  },
  centered: {
    flex: 1, // Takes up the entire space of the flex container
    justifyContent: 'center', // Centers content vertically in the container
    alignItems: 'center', // Centers content horizontally in the container
    marginTop: 100,
  },
})
