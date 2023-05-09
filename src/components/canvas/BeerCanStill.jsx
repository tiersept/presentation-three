import { useRef } from 'react';
import { CanGreenBullet } from './CanGreenBullet';

export const BeerCanStill = ({ index, z, speed }) => {
  const ref = useRef();

  return (
    <CanGreenBullet
      ref={ref}
      distances={[0, 65, 0]}
      position={[0, 0, 5]}
      rotation={[0, 0.5 * Math.PI, 0]}
    />
  );
};
