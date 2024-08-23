import { Platform } from 'react-native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';

export const statusBarHeight = getStatusBarHeight(true);     // 내 안드로이드 폰에서는 23.2157
export const bottomSpace = Platform.OS === 'ios' ? getBottomSpace() : 10;   // 내 안드로이드 폰에서는 0
export const ITEM_WIDTH = 220;    // todo list의 폭
