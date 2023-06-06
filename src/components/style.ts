import { StyleSheet } from 'react-native';

export const STEP_NUMBER_RADIUS: number = 14;
export const STEP_NUMBER_DIAMETER: number = STEP_NUMBER_RADIUS * 2;
export const Z_INDEX: number = 100;
export const MARGIN: number = 13;
export const OFFSET_WIDTH: number = 4;
export const ARROW_SIZE: number = 6;

export const styles = StyleSheet.create({
  arrow: {
    borderColor: 'transparent',
    borderWidth: ARROW_SIZE,
    position: 'absolute',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: '#27ae60',
  },
  container: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    Z_INDEX: Z_INDEX,
  },
  overlayContainer: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  overlayRectangle: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  stepNumber: {
    alignItems: 'center',
    backgroundColor: '#27ae60',
    borderColor: '#FFFFFF',
    borderRadius: STEP_NUMBER_RADIUS,
    borderWidth: 2,
    flex: 1,
    justifyContent: 'center',
  },
  stepNumberContainer: {
    height: STEP_NUMBER_DIAMETER,
    overflow: 'hidden',
    position: 'absolute',
    width: STEP_NUMBER_DIAMETER,
    Z_INDEX: Z_INDEX + 1,
  },
  stepNumberText: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontSize: 10,
  },
  tooltip: {
    backgroundColor: '#fff',
    // borderRadius: 3,
    overflow: 'hidden',
    // paddingHorizontal: 15,
    // paddingTop: 15,
    position: 'absolute',
  },
  tooltipContainer: {
    flex: 1,
  },
  tooltipText: {},
});
