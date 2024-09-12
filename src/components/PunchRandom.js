import React, { useState, useEffect } from 'react';

const PunchRandom = ({ trigger }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [randomPosition, setRandomPosition] = useState({ top: '0px', left: '0px' });

  useEffect(() => {
    if (trigger) {
        // Generate a random position
        const randomTop = `${Math.floor(Math.random() * 80)}vh`;
        const randomLeft = `${Math.floor(Math.random() * 80)}vw`;
        setRandomPosition({ top: randomTop, left: randomLeft });

        // Show the image
        setIsVisible(true);

        const hideTimeout = setTimeout(() => {
            setIsVisible(false);
        }, 500); // .5 second

        return () => clearTimeout(hideTimeout);
    }
  }, [trigger]);

  return (
    <div
        className={"fixed"}
        style={{
            top: randomPosition.top,
            left: randomPosition.left,
            zIndex: 1000,
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
