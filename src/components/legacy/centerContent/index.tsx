import {View, Text} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import CategoryBlock from './components/categoryBlock.tsx';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useTheme} from 'styled-components/native';
import {Image} from 'react-native';
import CenterFieldComp from './components/centerField.tsx';
import {
  ArmsContainer,
  FullBodyContainer,
  HeadNeckContainer,
  LegsContainer,
  TitleContainer,
  UpdatedText,
  UpperBodyContainer,
} from './CenterContent.style.tsx';
import useDate from '../../../hooks/useDate.tsx';
import PageButtonRow from '../pageButtonRow';
import CategoryButtonSelector from '../categoryButtonSelectorRow';
import DetachedModal from '../modals/detached';
import {useModal} from '../../../contexts/ModalContext.tsx';
import ActionModal from '../modals/action';
import {useDispatch, useSelector} from 'react-redux';
import {showNotification} from '../../../store/notifications';

const CenterContent = ({
  onClose,
  mainScrollRef,
  openBottomSheet,
  bottomSheetRef,
  animateTrigger,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const actionsData = useSelector(state => state.actions.actions);
  const previousLength = useRef(actionsData.length);

  useEffect(() => {
    if (actionsData.length > previousLength.current) {
      // Assuming the last action is the newly added one
      const lastAction = actionsData[actionsData.length - 1];

      // Dispatch the notification
      dispatch(
        showNotification({
          message: {
            boldPart: `${lastAction.text}`,
            normalPart: `was added as an action successfully`,
          },
          type: lastAction.category.toLowerCase(), // or any logic to determine the type
        }),
      );
    }
    // Update the reference to the current length after changes
    previousLength.current = actionsData.length;
  }, [actionsData, dispatch]);
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const snapPoints = useMemo(() => ['97%'], []);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [actions, setActions] = useState([]); // Add this state
  const [activeBodyParts, setActiveBodyParts] = useState([]);

  const setActiveBodyPartsForFirstAction = category => {
    // Find the first action for the selected category
    const firstAction = actionsData.find(
      action => action.category === category,
    );
    if (firstAction) {
      // If found, set its body part as the only active body part
      setActiveBodyParts([firstAction.bodyPart.toLowerCase()]);
    } else {
      // If no actions found for the category, reset active body parts
      setActiveBodyParts([]);
    }
  };

  // Function to update the active body parts state
  const setActiveBodyPartsForCategory = category => {
    // Get unique body parts for the selected category
    const bodyPartsForCategory = actionsData
      .filter(action => action.category === category)
      .map(action => action.bodyPart.toLowerCase());
    setActiveBodyParts(bodyPartsForCategory);
  };

  const setActiveBodyPartsForBodyPart = bodyPart => {
    setActiveBodyParts([bodyPart.toLowerCase()]);
  };

  // Adjust getOpacity to directly reflect changes in active body parts
  const getOpacity = bodyPart => {
    // If activeBodyParts is empty or includes the current body part, return full opacity
    if (
      !activeBodyParts.length ||
      activeBodyParts.includes(bodyPart.toLowerCase())
    ) {
      return 1;
    }
    return 0.3; // Dimmed opacity for non-active body parts
  };

  const handleSlideChange = newIndex => {
    setActiveSlideIndex(newIndex); // Update active slide index

    const newActiveAction = actions[newIndex];
    if (newActiveAction) {
      // Update active body parts based on the new active action's body part
      setActiveBodyParts([newActiveAction.bodyPart.toLowerCase()]);
    }
  };

  const handleSheetChanges = index => {
    if (index === -1) {
      onClose && onClose(); // Only handle cleanup or state updates here
    } else {
      openBottomSheet();
    }
    // No need to immediately try to reopen the bottom sheet here
  };

  const date = useDate();

  const [modalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedCategory('');
    setSelectedBodyPart('');
    setActiveBodyParts([]); // Ensure this is reset
    setActiveSlideIndex(null);
  };

  useEffect(() => {
    console.log('Active body parts updated:', activeBodyParts);
    // Optionally force an update if necessary
  }, [activeBodyParts]);

  const updateActions = (category = null, bodyPart = null) => {
    let filteredActions = actionsData;

    if (category) {
      filteredActions = filteredActions.filter(
        action => action.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (bodyPart) {
      filteredActions = filteredActions.filter(
        action => action.bodyPart.toLowerCase() === bodyPart.toLowerCase(),
      );
    }

    setActions(filteredActions); // Update actions state with filtered actions
    setModalVisible(true); // Show the modal
  };

  // Adjust onSelectCategory to use the new function
  const onSelectCategory = category => {
    setSelectedCategory(category);
    const filteredActions = actionsData.filter(
      action => action.category === category,
    );
    setActions(filteredActions);

    // Optionally, set active body parts based on the first action's body part
    if (filteredActions.length) {
      setActiveBodyParts([filteredActions[0].bodyPart.toLowerCase()]);
    } else {
      setActiveBodyParts([]);
    }

    setModalVisible(true);
  };

  // Adjusted function to handle body part selection
  // Adjust onSelectBodyPart for immediate effect on opacity without waiting for modal swipe
  const onSelectBodyPart = bodyPart => {
    setSelectedBodyPart(bodyPart);
    setActiveBodyPartsForBodyPart(bodyPart); // Directly update active body parts based on selection
    updateActions(selectedCategory, bodyPart); // Filter actions by selected category and body part
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}>
      <BottomSheetView>
        <View
          style={{
            marginBottom: 20,
            marginTop: -20,
          }}>
          <HeadNeckContainer
            style={{opacity: getOpacity('head & neck')}}
            onPress={() => onSelectBodyPart('head & neck')}>
            <CenterFieldComp CenterFieldText="Head & Neck" />
          </HeadNeckContainer>
          <UpperBodyContainer
            style={{opacity: getOpacity('upper body')}}
            onPress={() => onSelectBodyPart('upper body')}>
            <CenterFieldComp CenterFieldText="Upper Body" />
          </UpperBodyContainer>
          <ArmsContainer
            style={{opacity: getOpacity('arms')}}
            onPress={() => onSelectBodyPart('arms')}>
            <CenterFieldComp CenterFieldText="Arms" />
          </ArmsContainer>
          <LegsContainer
            style={{opacity: getOpacity('legs')}}
            onPress={() => onSelectBodyPart('legs')}>
            <CenterFieldComp CenterFieldText="Legs" />
          </LegsContainer>
          <FullBodyContainer
            style={{opacity: getOpacity('full body')}}
            onPress={() => onSelectBodyPart('full body')}>
            <CenterFieldComp CenterFieldText="Full Body" />
          </FullBodyContainer>
          <Image
            source={require('../../../assets/images/AthleaPersonTemplate.png')}
            style={{
              width: 625,
              height: 625,
              resizeMode: 'cover',
              alignSelf: 'center',
              marginTop: 60,
            }}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <CategoryButtonSelector
            IconName1="strengthicon"
            onPress1={() => onSelectCategory('Strength')}
            IconName2="enduranceicon"
            onPress2={() => onSelectCategory('Endurance')}
            IconName3="recoveryicon"
            onPress3={() => onSelectCategory('Recovery')}
            IconName4="wellbeingicon"
            onPress4={() => onSelectCategory('Wellbeing')}
            IconName5="nutritionicon"
            onPress5={() => onSelectCategory('Nutrition')}
          />
        </View>
        <ActionModal
          isVisible={modalVisible}
          onClose={handleCloseModal} // Hide the modal
          actions={actions}
          setActiveSlideIndex={setActiveSlideIndex}
          onSlideChange={handleSlideChange}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default CenterContent;
