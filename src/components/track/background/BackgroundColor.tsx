import React from 'react';

import useImageColor from '../../../hooks/useImageColor.ts';
import useTrackImageProvider from '../useTrackImageProvider.ts';

const BackgroundColor: React.FC = () => {
  const { sourceCanvas, loadedUrl } = useTrackImageProvider();

  const color = useImageColor(sourceCanvas, loadedUrl);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 top-0 size-full brightness-75"
      style={{
        backgroundColor: color ?? '#000000',
      }}
    />
  );
};

export default BackgroundColor;
