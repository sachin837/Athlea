import {useState, useRef, useCallback, useMemo, useEffect} from 'react';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {set} from 'date-fns';
import {useFocusEffect} from '@react-navigation/native';

const useBottomSheet = setShowTextInput => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const bottomSheetRef2 = useRef<BottomSheet>(null);
  // Assuming '100%' is the last snap point
  const snapPoints = useMemo(() => ['15%', '100%'], []);
  const scrollRef = useRef(null); // Scroll ref for BottomSheetScrollView

  const openBottomSheet = () => {
    setIsBottomSheetVisible(true);
    // Expand to the last snap point, which is '100%'
    // Adjust this part if your BottomSheet component API differs
    bottomSheetRef2.current?.snapTo(1);
    setShowTextInput(false);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetVisible(false);
    bottomSheetRef2.current?.close();
  };

  // This effect will reset the scroll position of the BottomSheetScrollView when it is expanded

  const handleSheetChanges = useCallback(
    index => {
      // Close the BottomSheet if it's at the '15%' snap point or if the user drags it down to close
      if (index === 0 || index === -1) {
        // Assuming '15%' is at index 0
        setIsBottomSheetVisible(false);
        setShowTextInput(true);
        bottomSheetRef2.current?.close();
      }
    },
    [setShowTextInput],
  );

  return {
    isBottomSheetVisible,
    bottomSheetRef2,
    openBottomSheet,
    closeBottomSheet,
    snapPoints,
    handleSheetChanges,
    setIsBottomSheetVisible,
    scrollRef,
  };
};

export default useBottomSheet;
