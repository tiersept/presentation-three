import * as THREE from 'three';
import { forwardRef, useRef, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useItemActive } from '@/hooks/useItemActive';
// import { CanFunkyFalcon } from './CanFunkyFalcon';
import { CanGreenBullet } from './CanGreenBullet';
import { CanHowlingWolf } from './CanHowlingWolf';

const CanRandom = forwardRef(({ index, onClick, ...rest }, ref) => {
  const Cans = {
    // 0: <CanFunkyFalcon ref={ref} onClick={onClick} {...rest} />,
    1: <CanGreenBullet ref={ref} onClick={onClick} {...rest} />,
    2: <CanHowlingWolf ref={ref} onClick={onClick} {...rest} />,
  };

  return Cans[index] || null;
});

export const BeerCan = ({ index, z, speed }) => {
  const ref = useRef();

  const { viewport, camera } = useThree();

  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);

  const [data] = useState({
    randomIndex: THREE.MathUtils.randInt(0, 2),
    // Randomly distributing the objects along the vertical
    y: THREE.MathUtils.randFloatSpread(height * 2),
    // This gives us a random value between -1 and 1, we will multiply it with the viewport width
    x: THREE.MathUtils.randFloatSpread(2),
    // How fast objects spin, randFlost gives us a value between min and max, in this case 8 and 12
    spin: THREE.MathUtils.randFloat(8, 12),
    // Some random rotations, Math.PI represents 360 degrees in radian
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  const [dataInteracted] = useState({
    y: THREE.MathUtils.randFloatSpread(height * 2),
  });

  const hasInteracted = useRef(false);

  const lastPosition = useRef(null);

  const isReset = useRef(false);

  const { itemActive, setItemActive, setItemInactive } = useItemActive();

  const elapsedRotation = useRef(0);

  useFrame((state, delta) => {
    if (!ref.current) return;

    /**
     * Current is active so move to foreground
     */
    if (ref.current?.id === itemActive?.id) {
      elapsedRotation.current += delta;

      easing.damp3(ref.current.position, [0, 0, 5], 0.4, delta);

      easing.dampE(
        ref.current.rotation,
        [0, 0.5 * Math.PI + elapsedRotation.current / 5, 0],
        0.4,
        delta,
      );

      return;
    }

    /**
     * If hasInteracted then we always move the item back to the last position
     */
    if (hasInteracted.current) {
      elapsedRotation.current = 0;

      easing.damp3(
        ref.current.position,
        [
          lastPosition.current.x,
          (dataInteracted.y += delta * speed),
          lastPosition.current.z,
        ],
        isReset.current ? 0 : 0.4,
        delta,
      );

      easing.dampE(
        ref.current.rotation,
        [
          (data.rX += delta / data.spin),
          Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
          (data.rZ += delta / data.spin),
        ],
        0.4,
        delta,
      );

      // If they're too far up, set them back to the bottom
      if (dataInteracted.y > height * (index === 0 ? 4 : 1)) {
        isReset.current = true;
        dataInteracted.y = -(height * (index === 0 ? 4 : 1));

        setTimeout(() => {
          isReset.current = false;
        }, 100);
      }

      return;
    }

    /**
     * Initialize
     */
    if (delta < 0.1) {
      ref.current.position.set(
        index === 0 ? 0 : data.x * width,
        (data.y += delta * speed),
        -z,
      );
    }
    // Rotate the object around
    ref.current.rotation.set(
      (data.rX += delta / data.spin),
      Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
      (data.rZ += delta / data.spin),
    );
    // If they're too far up, set them back to the bottom
    if (data.y > height * (index === 0 ? 4 : 1)) {
      data.y = -(height * (index === 0 ? 4 : 1));
    }
  });

  const handleOnClick = (event) => {
    event.stopPropagation();

    const {
      eventObject: { id, name, position },
    } = event;

    if (itemActive) {
      setItemInactive();

      return;
    }

    if (itemActive && itemActive?.id !== id) {
      return;
    }

    lastPosition.current = event.point;
    dataInteracted.y = event.point.y;
    setItemActive({ id, name, position });

    if (!hasInteracted.current) {
      hasInteracted.current = true;
    }
  };

  return (
    <CanRandom ref={ref} index={data.randomIndex} onClick={handleOnClick} />
  );
};
