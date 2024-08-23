import { Link, Stack } from 'expo-router';
import { Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function MiscLayout() {
  return (
    <Stack screenOptions={{ 
      headerStyle: { backgroundColor: 'skyblue', alignItems: 'center' }}}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Todo List App', 
          headerRight: () => (
            <Link href="/gallery">
              <AntDesign name="picture" size={18} />
            </Link>
          ),
        }} 
      />
      <Stack.Screen 
        name="gallery" 
        options={{ 
          headerTitle: () => (
            <Text style={{ fontSize: 20, fontWeight: 500, marginLeft: -20 }}>Gallery App</Text>
          ),
        }} 
      />
    </Stack>
  );
}
