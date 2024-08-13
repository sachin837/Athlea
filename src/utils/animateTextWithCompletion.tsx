import {useState, useEffect} from 'react';

// Define the expected type for the text sections and speed, with proper default values and return types.
function useAnimateTextWithCompletion(
  textSections: string[],
  speed: number = 1,
): {animatedSections: string[]; isComplete: boolean} {
  const [animatedSections, setAnimatedSections] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false); // Add isComplete state to track completion

  useEffect(() => {
    setAnimatedSections([]); // Reset on textSections change
    setIsComplete(false); // Reset completion status
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < textSections.length) {
        setAnimatedSections(prev => [...prev, textSections[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
        setIsComplete(true); // Set completion status to true when animation ends
      }
    }, speed);

    return () => clearInterval(intervalId); // Cleanup on unmount or textSections change
  }, [textSections, speed]);

  return {animatedSections, isComplete};
}

export default useAnimateTextWithCompletion;
