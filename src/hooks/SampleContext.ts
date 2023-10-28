import * as React from 'react';
import { SampleState, DispatchActions } from '../defs';

export const SampleContext = React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  SampleContext.displayName = 'SampleContext';
}

export function sampleContext() {
  return <[SampleState, typeof DispatchActions]>React.useContext(SampleContext);
}

export default SampleContext;
