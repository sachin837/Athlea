import {useEffect, useState} from 'react';
import {Text} from 'react-native';

const LoadingText = () => {
  const [loadingText, setLoadingText] = useState('Loading');

  useEffect(() => {
    const dotCycle = ['.', '..', '...'];
    let cycleIndex = 0;

    const interval = setInterval(() => {
      setLoadingText(`Loading${dotCycle[cycleIndex]}`);
      cycleIndex = (cycleIndex + 1) % dotCycle.length; // Cycle through 0, 1, 2
    }, 500); // Change dots every 500ms

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <Text
      style={{
        color: 'black',
      }}>
      {loadingText}
    </Text>
  );
};

export default LoadingText;
