import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

const tintColorLight = '#0a7ea4';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColorLight,
        headerShown: false,
      }}
    >
      <Tabs.Screen 
        name="(home2)" 
        options={{
          title: 'Home2',
          tabBarIcon: () => <TabBarIcon name='home' />
        }}
      />
      <Tabs.Screen 
        name="settings" 
        options={{
          title: '설정',
          tabBarIcon: () => <TabBarIcon name='settings' />
        }}
      />
      {/* <Tabs.Screen name="settings" /> */}
    </Tabs>
  );
}