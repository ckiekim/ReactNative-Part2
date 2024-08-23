import { KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, TextInput } from 'react-native';
import styled from 'styled-components/native';

const StyledPressable = styled.Pressable`
  flex: 1;
`;
const StyledSafeAreaView = styled.SafeAreaView`
  width: 100%; position: absolute; bottom: 0px;
`;
const StyledTextInput = styled.TextInput`
  width: 100%; padding: 10px; background-color: white;
  border-width: 0.4px; border-color: lightgrey; 
`;

export default function TextInputModal({ 
  textInputModalVisible, closeTextInputModal, albumTitle, setAlbumTitle, addAlbum
}) {
  const onSubmitEditing = () => {
    if (!albumTitle)
      return;
    addAlbum();
    closeTextInputModal();
    setAlbumTitle('');
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={textInputModalVisible}
      >
        <StyledPressable style={{ flex: 1 }} onPress={closeTextInputModal}> 
          <StyledSafeAreaView>
            <StyledTextInput 
              value={albumTitle}
              onChangeText={setAlbumTitle}
              onSubmitEditing={onSubmitEditing}
              placeholder="앨범명을 입력해주세요."
              autoFocus={true}
            />
          </StyledSafeAreaView>
        </StyledPressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}
