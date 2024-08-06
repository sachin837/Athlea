// Import SafeAreaView from react-native-safe-area-context
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

// Define your custom SafeAreaView component
const CustomSafeAreaView = ({backgroundColor, paddingTop, children}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: backgroundColor || 'white', // Default background color
        paddingTop: paddingTop || 0, // Default padding top
      }}>
      {children}
    </SafeAreaView>
  );
};

export default CustomSafeAreaView;
