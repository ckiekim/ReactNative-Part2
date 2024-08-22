import { Image, Modal, Pressable, TouchableOpacity, View } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import styled from 'styled-components/native';

const StyledTouchableOpacity = styled.TouchableOpacity`
  padding-vertical: 30px; padding-horizontal: 10px;
`;
const StyledPressable = styled.Pressable`
  flex: 1; justify-content: center; align-items: center; background-color: rgba(110, 110, 110, 0.5);
`;
const StyledView = styled.View`
  flex-direction: row; align-items: center;
`;
const StyledImage = styled.Image`
  width: 280px; height: 210px; background-color: white;
`;

const ArrowButton = ({ iconName, onPress, disabled }) => {
  return (
    <StyledTouchableOpacity onPress={onPress} disabled={disabled}>
      <SimpleLineIcons name={iconName} size={24} color={disabled ? 'transparent' : 'black'} />
    </StyledTouchableOpacity>
  )
}

export default function BigImageModal({ 
  bigImageModalVisible, closeBigImageModal, selectedImage, onPressLeftArrow, onPressRightArrow, 
  showPreviousArrow, showNextArrow,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={bigImageModalVisible}
    >
      <StyledPressable onPress={closeBigImageModal}>
        <StyledView>
          <ArrowButton 
            iconName="arrow-left" onPress={onPressLeftArrow} disabled={!showPreviousArrow}
          />
          <Pressable>
            <StyledImage 
              source={{ uri: selectedImage?.uri }}
              resizeMode="contain"
            />
          </Pressable>
          <ArrowButton 
            iconName="arrow-right" onPress={onPressRightArrow} disabled={!showNextArrow}
          />
        </StyledView>
      </StyledPressable>
    </Modal>
  );
}
