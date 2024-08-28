// app/(tabs)/_layout.jsx

import { Tabs } from 'expo-router';
import TabBarIcon from '@/components/navigation/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="(home)"
      screenOptions={{
        tabBarActiveTintColor: '#0a7ea4',
        headerShown: false,
      }}
    >
      <Tabs.Screen 
        name="(home)" 
        options={{
          title: '홈',
          tabBarIcon: () => <TabBarIcon name='home' />
        }}
      />
      <Tabs.Screen 
        name="(calc)" 
        options={{
          title: '계산기',
          tabBarIcon: () => <TabBarIcon name='calculator' />
        }}
      />
      <Tabs.Screen 
        name="(kakao)" 
        options={{
          title: '카카오',
          tabBarIcon: () => <TabBarIcon name='bus' />
        }}
      />
      <Tabs.Screen 
        name="(misc)" 
        options={{
          title: '기타',
          tabBarIcon: () => <TabBarIcon name='apps' />
        }}
      />
    </Tabs>
  );
}