import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import ErrorBoundary from '@components/ErrorBoundary';

const children = <div data-testid="Error-Children">children</div>;

const ErrorBoundaryMock: jest.Mock = jest
  .fn()
  .mockImplementation((props) => <div data-testid="ErrorBoundary">{props.children}</div>);
jest.mock('@sentry/react', () => ({
  ErrorBoundary: (props: any) => ErrorBoundaryMock(props) as any,
}));

describe('ErrorBoundary', () => {
  let wrapper: RenderResult;

  const app = 'sample';

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = render(<ErrorBoundary app={app}>{children}</ErrorBoundary>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('render the main component on the screen', () => {
    expect(wrapper.getByTestId('ErrorBoundary')).toBeDefined();
    expect(wrapper.getByTestId('Error-Children')).toBeDefined();
  });

  it('render the fallback', () => {
    const error = new Error('Test');

    ErrorBoundaryMock.mockImplementation(
      (props) =>
        (
          <div data-testid={'ErrorBoundary'}>
            {(props.fallback as any)({
              error,
              componentStack: 'componentStack',
            })}
          </div>
        ) as any,
    );

    wrapper.rerender(<ErrorBoundary app={app}>{children}</ErrorBoundary>);

    expect(wrapper.getByTestId('ErrorBoundary')).toBeDefined();
    expect(wrapper.getByText('Error: Test')).toBeDefined();
    expect(wrapper.getByText('componentStack')).toBeDefined();
    expect(wrapper.getByRole('button')).toBeDefined();
    expect(wrapper.getByText('RELOAD')).toBeDefined();
  });

  it('Sentry set tag', () => {
    const setTag = jest.fn();

    ErrorBoundaryMock.mockImplementation(
      (props) =>
        (
          <div data-testid={'ErrorBoundary'}>
            {(props.beforeCapture as any)({
              setTag,
            } as any)}
          </div>
        ) as any,
    );

    wrapper.rerender(<ErrorBoundary app={app}>{children}</ErrorBoundary>);

    expect(setTag).toHaveBeenCalled();
    expect(setTag).toHaveBeenCalledWith('application', app);
  });

  it('Sentry set tag by using app', () => {
    const setTag = jest.fn();

    ErrorBoundaryMock.mockImplementation(
      (props) =>
        (
          <div data-testid={'ErrorBoundary'}>{(props.beforeCapture as any)({ setTag } as any)}</div>
        ) as any,
    );

    wrapper.rerender(<ErrorBoundary app={app}>{children}</ErrorBoundary>);

    expect(setTag).toHaveBeenCalled();
    expect(setTag).toHaveBeenCalledWith('application', app);
  });

  it('Sentry set tag by using other', () => {
    const setTag = jest.fn();

    ErrorBoundaryMock.mockImplementation(
      (props) =>
        (
          <div data-testid={'ErrorBoundary'}>{(props.beforeCapture as any)({ setTag } as any)}</div>
        ) as any,
    );

    wrapper.rerender(<ErrorBoundary>{children}</ErrorBoundary>);

    expect(setTag).toHaveBeenCalled();
    expect(setTag).toHaveBeenCalledWith('application', 'other');
  });
});
