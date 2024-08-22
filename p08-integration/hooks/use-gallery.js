import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const defaultAlbum = { id: 1, title: '기본' }
const ASYNC_KEY = {
  ALBUM: 'album',
  IMAGE: 'image'
}

export default function useGallery() {
  const [images, setImages] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);
  const [albums, setAlbums] = useState([defaultAlbum]);
  const [textInputModalVisible, setTextInputModalVisible] = useState(false);
  const [bigImageModalVisible, setBigImageModalVisible] = useState(false);
  const [albumTitle, setAlbumTitle] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    initGallery();
  }, []);
  async function initGallery() {
    try {
      const album = await AsyncStorage.getItem(ASYNC_KEY.ALBUM);
      if (album) {
        setAlbums(JSON.parse(album));
        setSelectedAlbum(albums[0]);
      } 
      const image = await AsyncStorage.getItem(ASYNC_KEY.IMAGE);
      if (image)
        setImages(JSON.parse(image));
    } catch (error) {
      console.log(error);
    }
  }

  const handleImageList = newImages => {
    setImages(newImages);
    AsyncStorage.setItem(ASYNC_KEY.IMAGE, JSON.stringify(newImages));
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const lastId = images.length === 0 ? 0 : images[images.length - 1].id;
      const newImage = {
        id: lastId + 1,
        uri: result.assets[0].uri,
        albumId: selectedAlbum.id,
      };
      const newImages = [ ...images, newImage ];
      handleImageList(newImages);
    }
  };
  const deleteImage = (imageId) => {
    Alert.alert('이미지를 삭제하시겠습니까?', '', [
      { style: 'cancel', text: '아니오' },
      { text: '네', onPress: () => {
          const newImages = images.filter(image => image.id !== imageId);
          handleImageList(newImages);
      }}
    ]);
  };
  const filteredImages = images.filter(image => image.albumId === selectedAlbum.id);
  const imagesWithAddButton = [
    ...filteredImages, { id: -1, uri: '', }
  ];

  const openTextInputModal = () => setTextInputModalVisible(true);
  const closeTextInputModal = () => setTextInputModalVisible(false);
  const openBigImageModal = () => setBigImageModalVisible(true);
  const closeBigImageModal = () => setBigImageModalVisible(false);
  
  const handleAlbumList = newAlbums => {
    setAlbums(newAlbums);
    AsyncStorage.setItem(ASYNC_KEY.ALBUM, JSON.stringify(newAlbums));
  }
  const addAlbum = () => {
    const newAlbumId = albums[albums.length - 1].id + 1;
    const newAlbum = { id: newAlbumId, title: albumTitle };
    const newAlbums = [ ...albums, newAlbum ];
    handleAlbumList(newAlbums);
    setSelectedAlbum(newAlbum);
  };
  const deleteAlbum = (albumId) => {
    if (albumId === defaultAlbum.id) {
      Alert.alert('기본 앨범은 삭제할 수 없습니다.');
      return;
    }
    Alert.alert('앨범을 삭제하시겠습니까?', '', [
      { style: 'cancel', text: '아니오' },
      { text: '네', onPress: () => {
          const newAlbums = albums.filter(album => album.id !== albumId);
          handleAlbumList(newAlbums);
          setSelectedAlbum(defaultAlbum);
          closeDropdown();
      }}
    ]);
  };

  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);
  const onPressHeader = () => {
    if (isDropdownOpen)
      closeDropdown();
    else
      openDropdown();
  }

  const onPressAlbum = (album) => {
    setSelectedAlbum(album);
    closeDropdown();
  }

  const selectImage = image => {
    setSelectedImage(image);
  }
  const moveToPreviousImage = () => {
    const selectedImageIndex = filteredImages.findIndex(image => image.id === selectedImage.id);
    if (selectedImageIndex <= 0)
      return;
    const previousImageIndex = selectedImageIndex - 1;
    const previousImage = filteredImages[previousImageIndex];
    setSelectedImage(previousImage);
  }
  const moveToNextImage = () => {
    const selectedImageIndex = filteredImages.findIndex(image => image.id === selectedImage.id);
    if (selectedImageIndex >= filteredImages.length - 1 || selectedImageIndex === -1)
      return;
    const nextImageIndex = selectedImageIndex + 1;
    const nextImage = filteredImages[nextImageIndex];
    setSelectedImage(nextImage);
  }
  const showPreviousArrow = filteredImages.findIndex(image => image.id === selectedImage?.id) !== 0;
  const showNextArrow = filteredImages.findIndex(image => image.id === selectedImage?.id) != filteredImages.length - 1;

  return {
    imagesWithAddButton, selectedAlbum, textInputModalVisible, albumTitle, isDropdownOpen, albums, 
    selectedImage, bigImageModalVisible, showPreviousArrow, showNextArrow,
    pickImage, deleteImage, openTextInputModal, closeTextInputModal, setAlbumTitle, addAlbum, deleteAlbum,
    onPressHeader, openDropdown, closeDropdown, onPressAlbum, 
    selectImage, openBigImageModal, closeBigImageModal, moveToPreviousImage, moveToNextImage, 
  }
}
