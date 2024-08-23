import { Link, Stack } from 'expo-router';
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
        options={{ title: 'Gallery App', }} 
      />
    </Stack>
  );
}
