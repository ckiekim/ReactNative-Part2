import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import Margin from '@/components/Margin';

export default function KakaoBusScreen() {
  return (
    <View style={styles.container}>
      <Text>Kakao Bus Screen</Text>
      <Margin height={10} />
      <Link href="/friends">
        <Text style={{ padding: 5, }}>View friends</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});