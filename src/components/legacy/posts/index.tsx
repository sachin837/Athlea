import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import React, {useState} from 'react'; // Example of icon library usage
import {imageMap} from '../content/addPersonContent';
import {Icon} from '../content/metricContent/metricContent.style.tsx';
import FastImage from 'react-native-fast-image';
import {useTheme} from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import SocialTagRow from '../tags/components/SocialTagRow.tsx';
const PostComp = ({
  imageUrl,
  accountName,
  postText,
  timePosted,
  thumbnailUrl,
  replyAmount,
  likeAmount,
  handlePress,
  articleTitle,
  coach,
  articleUrl,
  athlete = true,
  expert,
  handleAccountPress,
}) => {
  const theme = useTheme();
  const [isLiked, setIsLiked] = useState(false);
  const navigation = useNavigation();
  // Toggle like state
  const handleLikePress = () => {
    setIsLiked(!isLiked);
    // Here you could also dispatch an action to update the redux store
    // dispatch(toggleLikePost({ postId: id }));
  };
  console.log('PostComp articleUrl:', articleUrl);
  console.log('PostComp articleTitle:', articleTitle);

  // Function to handle press on article (FastImage)
  const handlePressArticle = (articleUrl, articleTitle) => {
    console.log(
      'Navigating to article with URL:',
      articleUrl,
      'and title:',
      articleTitle,
    ); // Debug log
    navigation.navigate('WebViewScreen', {
      sourceUrl: articleUrl,
      source: articleTitle,
    });
  };

  return (
    <View style={styles.container}>
      <View>
        {imageUrl ? (
          <TouchableOpacity onPress={handleAccountPress}>
            <Image
              source={imageUrl}
              style={{
                width: 33,
                height: 33,
                marginRight: 1,
                marginTop: coach || expert || athlete ? 2 : 0,
              }}
            />
          </TouchableOpacity>
        ) : (
          <Icon
            name="person"
            size={28}
            style={{
              marginRight: 1,
              marginLeft: 9,
            }}
          />
        )}
        {thumbnailUrl && (
          <View>
            <View style={styles.verticalLine} />
            <View style={styles.bottomImagesContainer}>
              <Image
                source={imageMap['RandomImage1.png']}
                style={styles.bottomImage}
              />
              <Image
                source={imageMap['RandomImage2.png']}
                style={styles.secondBottomImage}
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <TouchableOpacity onPress={handleAccountPress}>
              <Text style={styles.accountName}>{accountName}</Text>
            </TouchableOpacity>
            <SocialTagRow Tag1={athlete} Tag2={coach} Tag3={expert} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.timePosted}>{timePosted}</Text>
            <Icon name="extras" style={{fontSize: 4.5, marginLeft: 16}} />
          </View>
          {/* Additional icons or options can go here */}
        </View>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.postText}>{postText}</Text>
        </TouchableOpacity>
        {thumbnailUrl && (
          <TouchableOpacity
            onPress={() => handlePressArticle(articleUrl, articleTitle)}>
            <FastImage source={{uri: thumbnailUrl}} style={styles.image} />
          </TouchableOpacity>
        )}
        <View style={[styles.actions, {marginBottom: thumbnailUrl ? 15 : 5}]}>
          <TouchableOpacity onPress={handleLikePress}>
            <Icon
              name={isLiked ? 'heart' : 'heart-border'}
              style={[
                styles.icon,
                {color: isLiked ? theme.secondary : 'black'},
              ]}
            />
          </TouchableOpacity>
          <Icon name="comment-border" style={styles.icon} />
          <Icon name="repost" style={styles.icon} />
          <Icon name="share-arrow" style={[styles.icon, {fontSize: 15}]} />
        </View>
        {thumbnailUrl && (
          <View
            style={{
              flexDirection: 'row',
              marginRight: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={handlePress}>
                <Text
                  style={{
                    color: 'grey',
                    fontSize: 14,
                    marginRight: 6,
                  }}>
                  {replyAmount} replies
                </Text>
              </TouchableOpacity>
              <Text style={{color: 'grey', fontSize: 14, marginRight: 6}}>
                •
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 14,
                }}>
                {likeAmount + (isLiked ? 1 : 0)} likes
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 14,
    paddingBottom: 10,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bottomImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 2,
    paddingBottom: 10,
    alignItems: 'center',
  },
  bottomImage: {
    width: 16, // Adjust to your preference
    height: 16, // Adjust to your preference
    borderRadius: 10, // Adjust to your preference
  },
  secondBottomImage: {
    width: 20, // Adjust to your preference
    height: 20, // Adjust to your preference
    borderRadius: 10, // Adjust to your preference
    marginLeft: -4, // Adjust to your preference
    zIndex: 4, // Adjust to your preference
    borderColor: 'white', // Adjust to your preference
    borderWidth: 2, // Adjust to your preference
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#D9D9D9', // Or the color of your choice
    marginVertical: 5, // Adjust as necessary
    height: 282, // Adjust as necessary
    marginRight: 10, // Adjust as necessary
    marginLeft: 16, // Adjust as necessary
  },
  image: {
    width: 305, // Your desired width
    height: 160, // Your desired height
    borderRadius: 8, // Round the corners of the image
    borderColor: 'grey', // Adjust as needed
    borderWidth: 1, // Adjust as needed
    marginTop: 10, // Adjust as needed
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  accountName: {
    fontWeight: '600',
    color: 'black',
    fontSize: 16,
  },
  timePosted: {
    color: 'grey',
    fontSize: 16,
  },
  postText: {
    // Styling for the post text, including color and margin
    marginTop: 8,
    color: 'black',
    fontSize: 16,
    width: '85%',
  },
  actions: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    marginTop: 16,
    marginBottom: 15,
    alignItems: 'center',
  },
  icon: {
    // Style your icons as needed
    fontSize: 18,
    marginRight: 14,
  },
});

export default PostComp;
