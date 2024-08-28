import { StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';

export default function WebpageViewScreen() {
  const { uri } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={{ padding: 20, fontSize: 16 }}>링크 조회: {uri}</Text>
      <WebView style={{ flex: 1 }} source={{ uri }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',
  },
});