import React, { useEffect, useMemo, useRef } from 'react';
import { type NativeMethods } from 'react-native';

import { useCopilot } from '../contexts/CopilotProvider';

interface Props {
  name: string;
  order: number;
  text: string;
  children: React.ReactElement<any>;
  active?: boolean;
}

export const CopilotStep = ({ name, order, text, children, active = true }: Props) => {
  const registeredName = useRef<string | null>(null);
  const { registerStep, unregisterStep } = useCopilot();
  const wrapperRef = React.useRef<NativeMethods | null>(null);

  const measure = async () => {
    return await new Promise<{
      x: number;
      y: number;
      width: number;
      height: number;
    }>((resolve) => {
      const measureShape = () => {
        // Wait until the wrapper element appears
        if (wrapperRef.current != null && 'measure' in wrapperRef.current) {
          wrapperRef.current.measure((_ox, _oy, width, height, x, y) => {
            resolve({
              height,
              width,
              x,
              y,
            });
          });
        } else {
          requestAnimationFrame(measureShape);
        }
      };

      measureShape();
    });
  };

  useEffect(() => {
    if (active) {
      if (registeredName.current && registeredName.current !== name) {
        unregisterStep(registeredName.current);
      }
      registerStep({
        measure,
        name,
        order,
        text,
        visible: true,
        wrapperRef,
      });
      registeredName.current = name;
    }
  }, [name, order, text, registerStep, unregisterStep, active]);

  useEffect(() => {
    if (active) {
      return () => {
        if (registeredName.current) {
          return unregisterStep(registeredName.current);
        }
      };
    }
    return () => {};
  }, [name, unregisterStep, active]);

  const copilotProps = useMemo(
    () => ({
      onLayout: () => {},
      ref: wrapperRef, // Android hack
    }),
    []
  );

  return React.cloneElement(children, { copilot: copilotProps });
};
