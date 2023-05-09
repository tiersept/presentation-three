import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/config';
import { CanvasParent } from '@/components/dom/CanvasParent';
import '@/styles/index.css';
import Scroll from '@/templates/Scroll';

const Scene = dynamic(
  () => import('@/components/canvas/Scene').then((module) => module.Scene),
  { ssr: true },
);

export default function App({ Component, pageProps = { title: 'index' } }) {
  const ref = useRef();

  return (
    <>
      <Header title={pageProps.title} />
      <CanvasParent ref={ref}>
        <Scroll>
          <Component {...pageProps} />
        </Scroll>
        {/* The canvas can either be in front of the dom or behind. If it is in front it can overlay contents.
         * Setting the event source to a shared parent allows both the dom and the canvas to receive events.
         * Since the event source is now shared, the canvas would block events, we prevent that with pointerEvents: none. */}
        {Component?.canvas && (
          <Scene
            className='pointer-events-none'
            eventSource={ref}
            eventPrefix='client'
            camera={{ position: [0, 0, 30] }}>
            {Component.canvas(pageProps)}
          </Scene>
        )}
      </CanvasParent>
    </>
  );
}
