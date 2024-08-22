import { useState } from 'react';
import { LIGHT_COLOR, DARK_COLOR } from '@/constants/bus-color';

export default function useTheme() {
  const [isDark, setIsDark] = useState(false);

  const toggleIsDark = () => setIsDark(!isDark);

  return {
    isDark,
    NEW_COLOR: isDark ? DARK_COLOR : LIGHT_COLOR,
    toggleIsDark
  }
}