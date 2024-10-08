import { Stack } from 'expo-router';

export default function MiscLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="gallery" options={{ headerShown: false }} />
    </Stack>
  );
}
