import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const StyledText = styled.Text`
  color: white; font-size: 16px;
`;

export default function LangButton({ onPress, isSelected, text }) {

  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.buttonContainer,
        isSelected ? styles.selectedButton : styles.notSelectedButton,
      ]} 
    >
      <StyledText>{text}</StyledText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#ffffff80',
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginHorizontal: 5,
  },
  selectedButton: {
    borderColor: 'white',
  },
  notSelectedButton: {
    borderColor: 'transparent',
  },
});