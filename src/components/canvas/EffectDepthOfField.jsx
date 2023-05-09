import { useRef } from 'react';
import { DepthOfField } from '@react-three/postprocessing';

export const EffectDepthOfField = () => {
  const refDepthOfField = useRef(null);

  return (
    <DepthOfField
      ref={refDepthOfField}
      focusDistance={0.15}
      focalLength={0.8}
      bokehScale={8}
      height={700}
    />
  );
};
