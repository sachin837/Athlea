import {useState, useRef, useCallback, useMemo} from 'react';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {set} from 'date-fns';

const useActionSheet = setShowTextInput => {
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);
  const actionSheetRef = useRef<BottomSheet>(null);
  // Assuming '100%' is the last snap point
  const snapActionPoints = useMemo(() => [300], []);

  const openActionSheet = () => {
    setIsActionSheetVisible(true);
    // Expand to the last snap point, which is '100%'
    // Adjust this part if your ActionSheet component API differs

    setShowTextInput(false);
    actionSheetRef.current?.expand();
  };

  const closeActionSheet = () => {
    setIsActionSheetVisible(false);
    setShowTextInput(true);
    actionSheetRef.current?.close();
  };

  return {
    isActionSheetVisible,
    actionSheetRef,
    openActionSheet,
    closeActionSheet,
    snapActionPoints,
    setIsActionSheetVisible,
  };
};

export default useActionSheet;
