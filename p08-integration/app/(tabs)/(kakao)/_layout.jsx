import { Stack } from 'expo-router';

export default function KakaoLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="friends" options={{ headerShown: false }} />
    </Stack>
  );
}
