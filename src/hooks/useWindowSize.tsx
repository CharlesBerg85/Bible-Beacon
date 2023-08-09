import { useState, useEffect } from 'react';

// Hook to get and update window size
const useWindowSize = () => {
  // Initialize state for window size with the actual window dimensions
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Function to update window size in state
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Check for the existence of window before adding event listener
    if (typeof window !== 'undefined') {
      // Add event listener to window resize event
      window.addEventListener('resize', handleResize);

      // Call handleResize to set initial values when the component mounts on the client-side
      handleResize();

      // Remove event listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []); // Empty dependency array to ensure this effect runs only once

  return windowSize;
};

export default useWindowSize;
