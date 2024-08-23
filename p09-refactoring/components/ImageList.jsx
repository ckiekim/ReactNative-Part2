import { Dimensions, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const width = Dimensions.get('screen').width;
const MIN_COLUMN_SIZE =  width >= 500 ? 200 : 120;
const divisor = width / MIN_COLUMN_SIZE;
const NUM_COLUMNS = Math.floor(divisor);
const columnWidth = width / NUM_COLUMNS;
const columnHeight = width * 3 / (4 * NUM_COLUMNS);   // aspect-ratio = 4 : 3
// console.log(`width: ${width}`);
// console.log(`NUM_COLUMNS: ${NUM_COLUMNS}`);

const StyledTouchableOpacity = styled.TouchableOpacity`
  width: ${columnWidth}px; height: ${columnHeight}px; 
  background-color: #c2c2c2; align-items: center; justify-content: center;
`;
const StyledText = styled.Text`
  font-weight: 100; font-size: 32px;
`;
const StyledImage = styled.Image`
  width: ${columnWidth}px; height: ${columnHeight}px;
`;

export default function ImageList({ imagesWithAddButton, onPressOpenGallery, onPressImage, onLongPressImage }) {
  const renderItem = ({ item: image }) => {
    if (image.id === -1) {
      return (
        <StyledTouchableOpacity  onPress={onPressOpenGallery}>
          <StyledText>+</StyledText>
        </StyledTouchableOpacity>
      );
    }
    return (
      <TouchableOpacity 
        onPress={() => onPressImage(image)}
        onLongPress={() => onLongPressImage(image.id)} 
      >
        <StyledImage source={{ uri: image.uri }} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList 
      data={imagesWithAddButton}
      keyExtractor={(item) => `image-${item.id}`}
      renderItem={renderItem}
      numColumns={NUM_COLUMNS}
      style={{ zIndex: -1 }}
      // onLayout={e => {
      //   console.log('layout.width', e.nativeEvent.layout.width);
      //   console.log('layout.height', e.nativeEvent.layout.height);
      // }}
    />
  );
}