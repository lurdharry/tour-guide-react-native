import React, { type FunctionComponent } from 'react';
import { NativeMethods } from 'react-native';

type PropsWithCopilot<P> = P & {
  copilot: {
    ref?: React.RefObject<NativeMethods>;
    onLayout?: () => void;
  };
};

export function walkthroughable<P = any>(WrappedComponent: React.ComponentType<P>) {
  const Component: FunctionComponent<PropsWithCopilot<P>> = ({ copilot, ...props }) => (
    <WrappedComponent {...(copilot as any)} {...props} />
  );

  Component.displayName = 'Walkthroughable';

  return Component;
}
