import React, { useState, useEffect } from 'react';

const PunchRandom = ({ trigger }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [randomPosition, setRandomPosition] = useState({ top: '0px', left: '0px' });

  useEffect(() => {
    if (trigger) {
        // Generate a random position
        const randomTop = `${Math.floor(Math.random() * 80)}vh`;
        const randomLeft = `${Math.floor(Math.random() * 80)}vw`;
        setRandomPosition({ top: randomTop, left: randomLeft });

        // Show the image
        setIsVisible(true);
        setOpacity(1);

        const fadeTimeout = setTimeout(() => {
            setOpacity(0);
          }, 0);

          const hideTimeout = setTimeout(() => {
            setIsVisible(false);
          }, 1000); // 1 second

        return () => {
            clearTimeout(fadeTimeout);
            clearTimeout(hideTimeout);
        }
    }
  }, [trigger]);

  return (
    <div
        className={`fixed transition-opacity duration-1000`}
        style={{
            top: randomPosition.top,
            left: randomPosition.left,
            zIndex: 1000,
            opacity: opacity, // Dynamic opacity
            transition: 'opacity 1s ease-in-out', // Smooth transition
        }}
    >
        {isVisible && (
            <img
                src="/images/pow-transparent.png"
                alt="Pow!"
                className="w-fit h-fit object-contain"
            />
        )}
    </div>
  );
};

export default PunchRandom;
