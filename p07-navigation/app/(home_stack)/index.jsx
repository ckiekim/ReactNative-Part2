import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

import Margin from '@/components/Margin';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home(home)</Text>
      <Margin height={10} />
      <Link href="/details">
        <Text style={{ padding: 5, }}>View details</Text>
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
