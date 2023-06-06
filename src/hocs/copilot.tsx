import React, { type FunctionComponent, type ComponentType } from 'react';

import { CopilotProvider, useCopilot } from '../contexts/CopilotProvider';
import { type CopilotOptions } from '../types';

const ComponentWithCopilotContext = (WrappedComponent: ComponentType) => {
  const Component: FunctionComponent<any> = (props) => {
    const copilotProps = useCopilot();
    return <WrappedComponent {...props} {...copilotProps} />;
  };

  Component.displayName = `CopilotInjector(${
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
  })`;

  return Component;
};

/**
 * @deprecated The HOC is deprecated. Please use `CopilotProvider` instead.
 */
export function copilot<P = any>(options: CopilotOptions) {
  return (WrappedComponent: ComponentType) => {
    const OuterComponent: FunctionComponent<P> = (props) => {
      const InnerComponentWithCopilotContext = ComponentWithCopilotContext(WrappedComponent);

      return (
        <CopilotProvider {...options}>
          <InnerComponentWithCopilotContext {...props} />
        </CopilotProvider>
      );
    };

    OuterComponent.displayName = `copilot(${
      WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
    })`;

    return OuterComponent;
  };
}
