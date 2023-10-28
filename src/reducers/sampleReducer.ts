import { SampleState, Actions } from '../defs';

export interface ViewState {
  showError: boolean;
  showExpanded: boolean;
  showIntro: boolean;
}

export const defaultStateMachine: ViewState = {
  showError: false,
  showExpanded: false,
  showIntro: true,
};

export const sampleReducer = (state: SampleState, action: Actions): SampleState => {
  switch (action.type) {
    case 'EXPAND':
      return {
        ...state,
        viewState: {
          ...defaultStateMachine,
          showExpanded: true,
          showIntro: false,
        },
      };
    case 'MINIMIZE':
      return {
        ...state,
        viewState: {
          ...defaultStateMachine,
          showExpanded: false,
          showIntro: true,
        },
      };
    default:
      throw new Error('reducer error');
  }
};
