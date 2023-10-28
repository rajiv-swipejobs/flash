import React from 'react';
import * as Sentry from '@sentry/react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Button } from '@material-ui/core';

export default function ErrorBoundary(props: { children: React.ReactNode; app?: string }) {
  const { children, app = 'other' } = props;
  // eslint-disable-next-line no-return-assign
  const reload = () => (window.location.href = '/');

  return (
    <Sentry.ErrorBoundary
      beforeCapture={(scope) => {
        scope.setTag('application', app);
      }}
      fallback={({ error, componentStack }) => (
        <Alert
          data-testid="ErrorBoundary-Alert"
          severity="error"
          action={
            <Button color="inherit" onClick={reload} data-testid="ErrorBoundary-Button-Alert">
              RELOAD
            </Button>
          }
        >
          <AlertTitle data-testid="ErrorBoundary-AlertTitle">{error.toString()}</AlertTitle>
          <details data-testid="ErrorBoundary-AlertDetails" style={{ whiteSpace: 'pre-wrap' }}>
            {componentStack}
          </details>
        </Alert>
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}
