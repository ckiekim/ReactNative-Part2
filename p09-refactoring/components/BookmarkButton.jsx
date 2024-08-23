import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLOR } from '../constants/bus-color';

export default function BookmarkButton({ 
  isBookmarked: isBookmarkedFromProp, onPressBookmark, size, style, NEW_COLOR,
}) {
  const [isBookmarked, setIsBookmarked] = useState(isBookmarkedFromProp);

  return (
    <TouchableOpacity 
      onPress={() => {
        setIsBookmarked(!isBookmarked);
        onPressBookmark();
      }}
      style={style}
    >
      <Ionicons 
        name="star" 
        size={size} 
        color={isBookmarked ? COLOR.YELLOW : NEW_COLOR.GRAY_1_GRAY_4}
      />
    </TouchableOpacity>
  );
}