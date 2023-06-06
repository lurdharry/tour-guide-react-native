import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';

import type { MaskProps, ValueXY } from '../types';
import { styles } from './style';

export const ViewMask = (props: MaskProps) => {
  const sizeValue = useRef<Animated.ValueXY>(new Animated.ValueXY(props.size)).current;
  const positionValue = useRef<Animated.ValueXY>(new Animated.ValueXY(props.position)).current;
  const [animated, setAnimated] = useState(false);

  const animate = useCallback(
    (size: ValueXY = props.size, position: ValueXY = props.position): void => {
      if (animated) {
        Animated.parallel([
          Animated.timing(sizeValue, {
            duration: props.animationDuration,
            easing: props.easing,
            toValue: size,
            useNativeDriver: false,
          }),
          Animated.timing(positionValue, {
            duration: props.animationDuration,
            easing: props.easing,
            toValue: position,
            useNativeDriver: false,
          }),
        ]).start();
      } else {
        sizeValue.setValue(size);
        positionValue.setValue(position);
        setAnimated(props.animated);
      }
    },
    [
      animated,
      positionValue,
      props.animated,
      props.animationDuration,
      props.easing,
      props.position,
      props.size,
      sizeValue,
    ]
  );

  useEffect(() => {
    if (props.position || props.size) {
      animate(props.size, props.position);
    }
  }, [animate, props.position, props.size]);

  const width = props.layout ? props.layout.width : 500;
  const height = props.layout ? props.layout.height : 500;

  const leftOverlayRight = Animated.add(width, Animated.multiply(positionValue.x, -1));
  const rightOverlayLeft = Animated.add(sizeValue.x, positionValue.x);
  const bottomOverlayTopBoundary = Animated.add(sizeValue.y, positionValue.y);
  const topOverlayBottomBoundary = Animated.add(height, Animated.multiply(-1, positionValue.y));
  const verticalOverlayLeftBoundary = positionValue.x;
  const verticalOverlayRightBoundary = Animated.add(width, Animated.multiply(-1, rightOverlayLeft));

  return (
    <View style={props.style} onStartShouldSetResponder={props.onClick}>
      {[
        {
          backgroundColor: props.backdropColor,
          right: leftOverlayRight,
        },
        {
          backgroundColor: props.backdropColor,
          left: rightOverlayLeft,
        },
        {
          backgroundColor: props.backdropColor,
          left: verticalOverlayLeftBoundary,
          right: verticalOverlayRightBoundary,
          top: bottomOverlayTopBoundary,
        },
        {
          backgroundColor: props.backdropColor,
          bottom: topOverlayBottomBoundary,
          left: verticalOverlayLeftBoundary,
          right: verticalOverlayRightBoundary,
        },
      ].map((style, index) => (
        <Animated.View key={index} style={[styles.overlayRectangle, style]} />
      ))}
    </View>
  );
};
