import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { ConfigProvider } from '@swipejobs/react-hooks';
import { CssBaseline } from '@material-ui/core';
import {
  createGenerateClassName,
  createTheme,
  StylesProvider,
  ThemeProvider,
} from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import ErrorBoundary from '@components/ErrorBoundary';
import SampleComponent from './components/SampleComponent';
import SampleContext from './hooks/SampleContext';
import { sampleReducer, defaultStateMachine } from './reducers/sampleReducer';
import type { SampleState, ConfigData, FlagsData, LangData } from './defs';
import type { CoreProps } from './core.defs';

const generateClassName = createGenerateClassName({
  seed: 'SampleApp',
});

const Sample: React.FC<CoreProps<ConfigData, FlagsData, LangData>> = (props) => {
  const { singleSpa, muiTheme, i18next } = props;
  const initialState: SampleState = {
    singleSPA: singleSpa,
    viewState: {
      ...defaultStateMachine,
    },
    errorMessage: '',
  };

  const context = useReducer(sampleReducer, initialState);
  const theme = createTheme(muiTheme);

  return (
    {/*<ErrorBoundary app="sample-app">*/}
      {/*<ConfigProvider app="sample-app">*/}
        <StylesProvider generateClassName={generateClassName}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SampleContext.Provider value={context}>
              <SampleComponent />
            </SampleContext.Provider>
          </ThemeProvider>
        </StylesProvider>
      {/*</ConfigProvider>*/}
    {/*</ErrorBoundary>*/}
  );
};

export const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Sample,
  // @ts-ignore
  errorBoundary(err) {
    return <Alert severity="error">{err.toString()}</Alert>;
  },
});

export default Sample;
