import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Spacer from '@/components/Spacer';

export default function WebpageLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerStyle: { backgroundColor: 'beige', alignItems: 'center' },
        headerShown: false 
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
            <Text style={{ fontSize: 20, fontWeight: 500, marginLeft: -20 }}>Webpage Scrap 추가</Text>
          ),
        }} 
      />
    </Stack>
  );
}
