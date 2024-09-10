import React, { useEffect, useState } from 'react'
import {
  AvatarContainer,
  DetailsSection,
  HeaderButton,
  SheetContainer,
  SheetHeader,
  styles,
} from './Settings.style'
import {useTheme} from 'styled-components/native'
import {ProfileImage, Text, TextInput} from 'components'
import {Colors} from 'theme'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'
import RNFS from 'react-native-fs'
import DocumentPicker from 'react-native-document-picker'
import { ActivityIndicator, Platform } from 'react-native'

export const PersonalDetails = ({onClose}) => {
  const theme = useTheme()
  const [age, setAge] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [weight, setWeight] = useState(null)
  const [height, setHeight] = useState(null)
  const [profileImage, setProfileImage] = useState(null)
  const [selectedGender, setSelectedGender] = useState(null)
  const [errors, setErrors] = useState({})
  const [isSubmitPress, setIsSubmitPress] = useState<Boolean>(false)

  const getUserDetails = async () => {
    const user = auth().currentUser
    const userId = user?.uid
    if (userId) {
      setEmail(user?.email)
      setProfileImage(user?.photoURL)
      setName(user?.displayName)
      const result = await firestore()
        .collection('users')
        .doc(userId)
        .get()

      if (result.exists) {
        const userData = result.data()
        setAge(userData.age?.toString() || '')
        setSelectedGender(userData.gender || '')
        setWeight(userData.weight?.toString() || '')
        setHeight(userData.height?.toString() || '')
      } else {
        console.log('No user data found.')
      }
    }
  }

  const uploadImage = async () => {
    const user = auth().currentUser
    if (!user) {
      console.error('User is not logged in.')
      return
    }

    if (!profileImage || !profileImage.uri) {
      console.error('No image selected to upload.')
      return
    }

    console.log('Uploading image from URI:', profileImage.uri)

    let fileUri = profileImage.uri

    if (fileUri.startsWith('content://')) {
      try {
        const filePath = await RNFS.stat(fileUri)
        fileUri = filePath.path
        console.log('File path after conversion:', fileUri)
      } catch (err) {
        console.error('Error converting content URI to file path:', err)
        return
      }
    }

    const filename = `user-profile/${user.uid}/${Date.now()}_${profileImage.name}`
    const reference = storage().ref(filename)

    try {
      const task = reference.putFile(fileUri)

      await task

      const url = await reference.getDownloadURL()

      await user.updateProfile({ photoURL: url })
      console.log('Profile picture updated successfully!')
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }


  const updateUserProfile = async (updates) => {
    try {
      const userId = auth().currentUser?.uid
      if (!userId) {throw new Error('User is not logged in')}
      await firestore()
        .collection('users')
        .doc(userId)
        .set(updates, {merge: true})
      console.log('User profile updated in Firestore:', updates)
    } catch (error) {
      console.error('Error updating user profile: ', error)
    }
  }

  const handleUploadPhoto = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      })

      let fileUri = res[0].uri
      if (Platform.OS === 'ios') {
        // Convert file path for iOS
        fileUri = decodeURIComponent(fileUri).replace('file://', '')
      }
      let file = {
        uri: fileUri,
        name: res.name,
        type: res.type,
      }
      setProfileImage(file)

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker')
      } else {
        throw err
      }
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = 'Name is required.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email.'
    }

    const ageInt = parseInt(age, 10)
    if (!age || isNaN(ageInt) || ageInt < 0 || ageInt > 120) {
      newErrors.age = 'Please enter a valid age (0-120).'
    }

    const weightInt = parseInt(weight, 10)
    if (!weight || isNaN(weightInt) || weightInt <= 0) {
      newErrors.weight = 'Please enter a valid weight.'
    }

    const heightInt = parseInt(height, 10)
    if (!height || isNaN(heightInt) || heightInt <= 0) {
      newErrors.height = 'Please enter a valid height.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0 // Return true if no errors
  }

  const handleSave = async () => {
    if (!validate()) {
      return
    }
    setIsSubmitPress(true)
    try {
      let updateObj = {
        nickname: name,
        email,
        age: parseInt(age, 10),
        gender: selectedGender,
        height: parseInt(height, 10),
        weight: parseInt(weight, 10),
      }

      // Update Firebase Authentication profile
      const user = auth().currentUser
      if (user) {
        if (email && email !== user.email) {
          await user.updateEmail(email)
        }
        await user.updateProfile({ displayName: name })
      }

      // Update user profile in Firestore
      await updateUserProfile(updateObj)

      // If there's a profile image, upload it
      if (profileImage) {
        await uploadImage()
      }

      console.info('Profile updated successfully!')
    } catch (error) {
      console.info('Error saving profile. Please try again.')
    } finally {
      setIsSubmitPress(false)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  return (
    <SheetContainer>
      <SheetHeader>
        <HeaderButton onPress={onClose}>
          <Text color={Colors.black3}>Cancel</Text>
        </HeaderButton>
        <Text color={Colors.black1} size={16} weight="500" centered>
          Personal details
        </Text>
        <HeaderButton onPress={handleSave}>
          {isSubmitPress ? <ActivityIndicator
            style={{height: 16}}
            color={Colors.black1}
            size={'small'}
          /> : (<Text color={Colors.black3}>Save</Text>)}
        </HeaderButton>
      </SheetHeader>

      <AvatarContainer style={{ marginBottom: 10 }}>
        <ProfileImage
          edit
          size={100}
          onPress={handleUploadPhoto}
          backgroundColor={'#e1e1e1'}
          source={profileImage ? { uri: typeof profileImage === 'string' ? profileImage : profileImage?.uri } : require('../../../assets/images/people/RandomImage1.png')}
        />
        <Text color={Colors.black3} style={{ marginTop: 20 }} centered>
          Change photo
        </Text>
      </AvatarContainer>

      <DetailsSection style={{ gap: 10 }}>
        <TextInput
          label={'Name'}
          placeholder={'Name'}
          placeholderTextColor={theme.placeholder}
          inputStyle={styles.commonInputStyle}
          autoCapitalize="none"
          onChangeText={setName}
          value={name}
        />
        {errors.name && (<Text color={Colors.red}>{errors.name}</Text>)}

        <TextInput
          label={'Email'}
          placeholder={'Email'}
          placeholderTextColor={theme.placeholder}
          inputStyle={styles.commonInputStyle}
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />
        {errors.email && (<Text color={Colors.red}>{errors.email}</Text>)}

        <TextInput
          label={'Gender'}
          placeholder={'Gender'}
          placeholderTextColor={theme.placeholder}
          inputStyle={styles.commonInputStyle}
          autoCapitalize="none"
          onChangeText={setSelectedGender}
          value={selectedGender}
        />

        <TextInput
          label={'Age'}
          placeholder={'Age'}
          placeholderTextColor={theme.placeholder}
          inputStyle={styles.commonInputStyle}
          autoCapitalize="none"
          onChangeText={setAge}
          value={age}
        />
        {errors.age && (<Text color={Colors.red}>{errors.age}</Text>)}

        <TextInput
          label={'Weight'}
          placeholder={'Weight'}
          placeholderTextColor={theme.placeholder}
          inputStyle={styles.commonInputStyle}
          autoCapitalize="none"
          onChangeText={setWeight}
          value={weight}
        />
        {errors.weight && (<Text color={Colors.red}>{errors.weight}</Text>)}

        <TextInput
          label={'Height'}
          placeholder={'Height'}
          placeholderTextColor={theme.placeholder}
          inputStyle={styles.commonInputStyle}
          autoCapitalize="none"
          onChangeText={setHeight}
          value={height}
        />
        {errors.height && (<Text color={Colors.red}>{errors.height}</Text>)}
      </DetailsSection>
    </SheetContainer>
  )
}
