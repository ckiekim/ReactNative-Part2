// app/(tabs)/(kakao)/_layout.jsx

import { Link, Stack } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function KakaoLayout() {
  return (
    <Stack screenOptions={{ 
      headerStyle: { backgroundColor: 'papayawhip', alignItems: 'center' }}}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: '버스 도착시간 앱',  
          headerRight: () => (
            <Link href="/friends">
              <Ionicons name="people" size={18} />
            </Link>
          ),
        }} 
      />
      <Stack.Screen 
        name="friends" 
        options={{ title: '친구 목록 앱', }}
      />
    </Stack>
  );
}
