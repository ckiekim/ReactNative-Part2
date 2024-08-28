import { Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Keyboard, StyleSheet, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';

import useWebpage from '@/hooks/use-webpage';
import LoadingView from '@/components/translation/LoadingView';
import Spacer from '@/components/Spacer';
import { COLOR } from '@/constants/bus-color';

export default function WebpageAddScreen() {
  const router = useRouter();
  // console.log('WebpageAddScreen() Current path:', router.pathname);
  const {
    linkText, isLoading, metaData,
    setLinkText, addLink, saveLink, gotoHome,
  } = useWebpage();
  const { width: windowWidth } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ padding: 30, fontSize: 16, color: COLOR.WHITE }}>링크 추가</Text>
      </View>
      <Pressable style={styles.inputContainer} onPress={() => {Keyboard.dismiss()}}>
        {isLoading ? <LoadingView />
        : metaData === null ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 4 }}>
              <TextInput 
                value={linkText}
                onChangeText={setLinkText}
                placeholder="링크 주소(url)를 입력하세요."
                style={{ 
                  paddingHorizontal: 8, paddingVertical: 8, width: '100%',
                  borderWidth: 0.5, borderColor: COLOR.GRAY_4
                }}
                onSubmitEditing={addLink}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Spacer isHorizontal space={8} />
              <TouchableOpacity onPress={addLink} style={styles.buttonContainer}>
                <Text style={{ color: 'white', paddingHorizontal: 16, paddingVertical: 10 }}>확인</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.metaDataContainer}>
                <Image source={{ uri: metaData.image }} 
                  width={windowWidth - 48} height={(windowWidth-48) * 0.5} />
                <View style={{ paddingHorizontal:12, paddingVertical:8 }}>
                  <Spacer space={10} />
                  <Text style={{ fontSize: 18, color: 'black' }}>{metaData.title}</Text>
                  <Spacer space={4}/>
                  <Text style={{ fontSize: 13, color: 'grey' }}>{metaData.description}</Text>
                </View>
              </View>
              <Spacer space={12} />
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity 
                  style={styles.buttonContainer}
                  onPress={saveLink}
                >
                  <Text style={{ color: 'white', paddingHorizontal: 24, paddingVertical: 8 }}>확인</Text>
                </TouchableOpacity>
                <Spacer isHorizontal space={8} />
                <TouchableOpacity 
                  style={styles.cancelContainer}
                  onPress={gotoHome}
                >
                  <Text style={{ color: 'grey', paddingHorizontal: 24, paddingVertical: 8 }}>취소</Text>
                </TouchableOpacity>
              </View>
            </>
          )
        }
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',
  },
  headerContainer: {
    width: '100%', backgroundColor: COLOR.GRAY_3, justifyContent: 'center', alignItems: 'center',
  },
  inputContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center', width: '80%',
  },
  metaDataContainer: {
    borderWidth:1, borderRadius:4, borderColor:'gray'
  },
  buttonContainer: {
    justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.BLACK
  },
  cancelContainer: {
    justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.WHITE, 
    borderColor: COLOR.GRAY_3, borderWidth: 0.5,
  },
});