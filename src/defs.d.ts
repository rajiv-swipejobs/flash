import type Core from './core.defs';
import { ViewState } from './reducers/sampleReducer';

export { ViewState };

export interface LangData {}

export interface ConfigData {}

export interface FlagsData {}

export interface Actions {
  type: 'EXPAND' | 'MINIMIZE';
  [key: string]: any;
}

export declare function DispatchActions(actions: Actions): undefined;

export interface SampleState {
  singleSPA: Core.SingleSpaProps;
  viewState: ViewState;
  errorMessage: string;
}
