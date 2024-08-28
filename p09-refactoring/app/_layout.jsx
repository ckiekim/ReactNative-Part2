// app/_layout.jsx

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="(tabs)" 
        // options={{ 
        //   initialRouteName: "(home)" 
        // }}
      />
    </Stack>
  );
}
