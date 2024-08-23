import { Alert, SafeAreaView, StyleSheet, } from 'react-native';

import BigImageModal from '@/components/gallery/BigImageModal';
import ImageList from '@/components/gallery/ImageList';
import MyDropDownPicker from '@/components/gallery/MyDropDownPicker';
import TextInputModal from '@/components/gallery/TextInputModal';
import useGallery from '@/hooks/use-gallery';

export default function GalleryScreen() {
  const { 
    imagesWithAddButton, selectedAlbum, textInputModalVisible, albumTitle, isDropdownOpen, albums, 
    selectedImage, bigImageModalVisible, showPreviousArrow, showNextArrow,
    pickImage, deleteImage, openTextInputModal, closeTextInputModal, setAlbumTitle, addAlbum, deleteAlbum,
    onPressHeader, openDropdown, closeDropdown, onPressAlbum, 
    selectImage, openBigImageModal, closeBigImageModal, moveToPreviousImage, moveToNextImage, 
  } = useGallery();
  
  const onPressOpenGallery = () => { pickImage(); }
  const onPressImage = (image) => { selectImage(image); openBigImageModal(); }
  const onLongPressImage = (image) => { deleteImage(image); }

  const onPressLeftArrow = () => { moveToPreviousImage(); }
  const onPressRightArrow = () => { moveToNextImage(); }

  const onPressWatchAd = () => { console.log('광고 시청'); }
  const onPressAddAlbum = () => {
    if (albums.length >= 2) {
      Alert.alert('광고를 시청해야 앨범을 추가할 수 있습니다.', '', [
        { style: 'cancel', text: '닫기' },
        { text: '광고 시청', onPress: () => {
          onPressWatchAd();
        }}
      ]);
    } else 
      openTextInputModal();
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <MyDropDownPicker 
        isDropdownOpen={isDropdownOpen}
        onPressHeader={onPressHeader}
        selectedAlbum={selectedAlbum} 
        onPressAddAlbum={onPressAddAlbum} 
        albums={albums}
        deleteAlbum={deleteAlbum}
        onPressAlbum={onPressAlbum}
      />
      <TextInputModal 
        textInputModalVisible={textInputModalVisible} 
        closeTextInputModal={closeTextInputModal} 
        albumTitle={albumTitle} 
        setAlbumTitle={setAlbumTitle} 
        addAlbum={addAlbum}
      />
      <BigImageModal
        bigImageModalVisible={bigImageModalVisible} 
        closeBigImageModal={closeBigImageModal}
        selectedImage={selectedImage}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
        showPreviousArrow={showPreviousArrow} 
        showNextArrow={showNextArrow}
      />
      <ImageList 
        imagesWithAddButton={imagesWithAddButton}
        onPressOpenGallery={onPressOpenGallery}
        onPressImage={onPressImage}
        onLongPressImage={onLongPressImage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
