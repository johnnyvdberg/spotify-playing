import React from 'react';

import useTrackImageProvider from '../useTrackImageProvider.ts';

const BackgroundBlurred: React.FC = () => {
  const { trackImageCanvasSubscriber } = useTrackImageProvider();

  return (
    <canvas
      className="use-blur absolute bottom-0 left-0 right-0 top-0 size-full blur-3xl brightness-50"
      ref={trackImageCanvasSubscriber('albumart-background')}
    />
  );
};

export default BackgroundBlurred;
