import { View, Text, StyleSheet } from 'react-native';

export default function MiscScreen() {
  return (
    <View style={styles.container}>
      <Text>Misc Screen</Text>
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