import { sampleContext } from './SampleContext';

const useSampleHook = () => {
  const [state, dispatchActions] = sampleContext();
  const {
    viewState: { showExpanded, showIntro },
  } = state;

  const handleExpandClick = () => {
    dispatchActions({ type: showExpanded ? 'MINIMIZE' : 'EXPAND' });
  };

  return {
    handleExpandClick,
    showExpanded,
    showIntro,
  };
};

export default useSampleHook;
