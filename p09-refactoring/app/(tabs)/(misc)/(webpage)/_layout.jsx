// app/(tabs)/(misc)/webpage/_layout.jsx

import { Stack } from 'expo-router';
import { Text } from 'react-native';

export default function WebpageLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerStyle: { backgroundColor: 'beige', alignItems: 'center' },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Webpage Scrap App', 
        }} 
      />
      <Stack.Screen 
        name="add" 
        options={{ 
          headerTitle: () => (
            <Text style={{ fontSize: 20, fontWeight: 500, marginLeft: -20 }}>Webpage 링크 추가</Text>
          ),
        }} 
      />
      <Stack.Screen 
        name="view" 
        options={{ 
          headerTitle: () => (
            <Text style={{ fontSize: 20, fontWeight: 500, marginLeft: -20 }}>Webpage 상세 조회</Text>
          ),
        }} 
      />
    </Stack>
  );
}
