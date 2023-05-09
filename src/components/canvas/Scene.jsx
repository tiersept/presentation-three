import { Canvas } from '@react-three/fiber';
import { Environment, Stage } from '@react-three/drei';
import { BeerCan } from './BeerCan';
import { BeerCanStill } from './BeerCanStill';

export const Scene = ({
  speed = 0.5,
  count = 400,
  depth = 80,
  easing = (x) => Math.sqrt(1 - (x - 1) ** 2),
}) => (
  <Canvas
    gl={{ antialias: false }}
    dpr={[1, 1.5]}
    camera={{ position: [0, 0, 10], fov: 14, near: 0.01, far: depth + 15 }}>
    <color attach='background' args={['#70e4da']} />
    <Stage
      intensity={0.5}
      environment='city'
      adjustCamera={false}
      shadows={false}>
      <spotLight
        position={[10, 20, 10]}
        penumbra={1}
        intensity={1.5}
        color='orange'
      />
      <BeerCanStill />
      {/* {Array.from({ length: count }).map((_, index) => (
        <BeerCan
          key={index}
          index={index}
          z={Math.round(easing(index / count) * depth) + 2}
          speed={speed}
        />
      ))} */}
      <Environment preset='sunset' blur={0.8} />
    </Stage>
  </Canvas>
);
