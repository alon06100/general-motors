import React from 'react';
import Lottie from 'react-lottie';

const LottieControl = ({ width, height, animationData }) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
        <Lottie
            options={defaultOptions}
            height={height}
            width={width}
        />
  );
};

export default LottieControl;