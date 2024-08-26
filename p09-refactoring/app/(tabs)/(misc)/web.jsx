import { StyleSheet, Text, View } from "react-native";

export default function WebScreen() {

  return (
    <View style={styles.container}>
      <Text>Web Scrap Page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});