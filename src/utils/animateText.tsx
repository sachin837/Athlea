import {useState, useEffect} from 'react';

// Define the type of the textSections as an array of strings
function useAnimateText(textSections: string[], speed: number = 10): string[] {
  const [animatedSections, setAnimatedSections] = useState<string[]>([]);

  useEffect(() => {
    setAnimatedSections([]); // Reset on textSections change
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < textSections.length) {
        setAnimatedSections(prev => [...prev, textSections[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId); // Cleanup on unmount or textSections change
  }, [textSections, speed]);

  return animatedSections;
}

export default useAnimateText;
