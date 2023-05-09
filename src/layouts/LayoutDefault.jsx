import { forwardRef } from 'react';

export const LayoutDefault = forwardRef(({ children }, ref) => (
  <main ref={ref} className='min-h-screen'>
    {children}
  </main>
));
