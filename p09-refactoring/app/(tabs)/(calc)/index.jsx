import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Calculator from '@/components/calc/Calculator';

export default function CalcScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 50 }}>나의 계산기</Text>
      <Calculator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});