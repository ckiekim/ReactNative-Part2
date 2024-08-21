import { Stack } from 'expo-router';

export default function Home2Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#f4511e', },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold', },
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="details" options={{ headerShown: false }} />
    </Stack>
  );
}
