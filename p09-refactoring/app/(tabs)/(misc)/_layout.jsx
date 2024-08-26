import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Spacer from '@/components/Spacer';

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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Link href="/gallery">
                <AntDesign name="picture" size={18} />
              </Link>
              <Spacer isHorizontal space={12} />
              <Link href="/lotto">
                <AntDesign name="clockcircleo" size={16} />
              </Link>
              <Spacer isHorizontal space={12} />
              <Link href="/web">
              <MaterialIcons name="web" size={20} />
              </Link>
            </View>
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
      <Stack.Screen 
        name="lotto" 
        options={{ 
          headerTitle: () => (
            <Text style={{ fontSize: 20, fontWeight: 500, marginLeft: -20 }}>Lotto App</Text>
          ),
        }} 
      />
      <Stack.Screen 
        name="web" 
        options={{ 
          headerTitle: () => (
            <Text style={{ fontSize: 20, fontWeight: 500, marginLeft: -20 }}>Web Scrap App</Text>
          ),
        }} 
      />
    </Stack>
  );
}
