import { Text, TouchableOpacity, View } from 'react-native';

const columnSize = 38;

export default function CalendarColumn({ text, color, opacity, disabled, onPress, isSelected, hasTodo }) {
  return (
    <TouchableOpacity 
      disabled={disabled}
      onPress={onPress}
      style={{ 
        width: columnSize, 
        height: columnSize, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: isSelected ? '#c2c2c2' : 'transparent',
        borderRadius: columnSize / 2
      }}
    >
      <Text style={{ color, opacity, fontWeight: hasTodo ? 'bold' : 'normal' }}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}