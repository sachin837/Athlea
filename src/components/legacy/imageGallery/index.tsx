import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';

const ImageGallery = ({contents}) => {
  const navigation = useNavigation();
  const handlePressArticle = (articleUrl, articleTitle) => {
    // Use the navigate function from the navigation prop to navigate to the WebViewScreen
    // Pass the article URL and title to the WebViewScreen
    navigation.navigate('WebViewScreen', {
      sourceUrl: articleUrl,
      source: articleTitle,
    });
  };

  const trimUrl = (url, maxLength = 16) => {
    if (url.length > maxLength) {
      return url.substring(0, maxLength) + '...'; // Trim and append ellipsis
    }
    return url; // Return original if within limit
  };

  const renderContent = (content, index) => {
    switch (content.type) {
      case 'image':
      case 'gif': // GIFs are handled like images
        return (
          <View key={index.toString()} style={styles.imageContainer}>
            <FastImage source={content.src} style={styles.image} />
            <Text style={styles.titleText}>{content.title}</Text>
            <Text style={styles.urlText}>{trimUrl(content.url)}</Text>
            {content.showMore && (
              <View style={styles.overlay}>
                <Text style={styles.showMoreText}>Show more</Text>
              </View>
            )}
          </View>
        );
      case 'article':
        return (
          <TouchableOpacity
            key={index.toString()}
            onPress={() => handlePressArticle(content.url, content.title)}>
            <View style={styles.imageContainer}>
              <FastImage source={content.thumbnail} style={styles.image} />
              <Text style={styles.titleText}>{content.title}</Text>
              <Text style={styles.urlText}>{trimUrl(content.url)}</Text>
              {content.showOverlay && ( // This assumes articles might also have a showOverlay property
                <View style={styles.overlay}>
                  <Text style={styles.showMoreText}>{content.title}</Text>
                </View>
              )}
              {/* If no showOverlay or it's false, only the thumbnail is shown */}
            </View>
          </TouchableOpacity>
        );
      default:
        return null; // Or some default placeholder
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.row}>{contents.map(renderContent)}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    alignItems: 'center', // Centers the row in the ScrollView
  },
  row: {
    flexDirection: 'row', // Aligns children in a row
  },
  imageContainer: {
    borderRadius: 10, // Round the corners of the container
    overflow: 'hidden', // Clip the image within the border radius
    marginRight: 10, // Space between each image container
  },
  image: {
    width: 110, // Your desired width
    height: 110, // Your desired height
    borderRadius: 10, // Round the corners of the image
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Make the overlay cover the image
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent overlay
  },
  showMoreText: {
    color: 'white',
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  urlText: {
    fontSize: 10,
  },
});

export default ImageGallery;
