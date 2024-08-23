import { Text, TouchableOpacity, View } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import styled from 'styled-components/native';

const headerHeight = 50;
const StyledTouchableOpacityHeader = styled.TouchableOpacity`
  flex-direction: row; height: ${headerHeight}px; justify-content: center; align-items: center;
`;
const StyledText = styled.Text`
  font-weight: bold; font-size: 16px;
`;
const StyledTouchableOpacityAddAlbum = styled.TouchableOpacity`
  position: absolute; right: 0px; height: ${headerHeight}px; padding-right: 10px;
  justify-content: center; align-items: center;
`;
const StyledView = styled.View`
  position: absolute; top: ${headerHeight}px; width: 100%; background-color: #ffffff;
  border-bottom-color: grey; border-bottom-width: 0.4px; border-top-color: grey; border-top-width: 0.4px;
`;
const StyledTouchableOpacityAlbumList = styled.TouchableOpacity`
  padding-vertical: 6px; width: 100%; align-items: center; justify-content: center;
`;

export default function MyDropDownPicker({ 
  isDropdownOpen, onPressHeader, selectedAlbum, onPressAddAlbum, albums, deleteAlbum, onPressAlbum
}) {

  return (
    <View>
      <StyledTouchableOpacityHeader 
        activeOpacity={1}
        onPress={onPressHeader}
      >
        <StyledText>{selectedAlbum.title}</StyledText>
        <SimpleLineIcons 
          name={isDropdownOpen ? 'arrow-up' : 'arrow-down'} 
          size={12} color="black" style={{ marginLeft: 8 }}
        />
        <StyledTouchableOpacityAddAlbum onPress={onPressAddAlbum}>
          <Text>앨범 추가</Text>
        </StyledTouchableOpacityAddAlbum>
      </StyledTouchableOpacityHeader>

      {isDropdownOpen && (
        <StyledView>
          {albums.map(album => {
            const isSelectedAlbum = album.id === selectedAlbum.id;
            return (
              <StyledTouchableOpacityAlbumList 
                key={`album-${album.id}`}
                activeOpacity={1}
                onPress={() => onPressAlbum(album)}
                onLongPress={() => deleteAlbum(album.id)}
              >
                <Text style={{ fontWeight: isSelectedAlbum ? 'bold' : 'normal' }}>
                  {album.title}
                </Text>
              </StyledTouchableOpacityAlbumList>
          )})}
        </StyledView>
      )}
    </View>
  );
}