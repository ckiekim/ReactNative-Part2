import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AlarmButton({ onPressAlarm, style, NEW_COLOR }) {
  return (
    <TouchableOpacity onPress={onPressAlarm} style={style}>
      <Ionicons 
        name="alarm-outline" 
        size={24} 
        color={NEW_COLOR.GRAY_3_GRAY_2} 
      />
    </TouchableOpacity>
  );
}