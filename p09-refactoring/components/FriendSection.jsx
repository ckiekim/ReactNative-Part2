import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function FriendSection(props) {
  return (
    <View 
      style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
      }}
    >
      <Text style={{ fontSize: 12, color: 'grey' }}>친구 {props.friendProfileLen}</Text>
      <TouchableOpacity onPress={props.onPressArrow}>
        { props.isOpened ?
          <Ionicons name="chevron-down-outline" size={24} color="lightgrey" />
          :
          <Ionicons name="chevron-up-outline" size={24} color="lightgrey" />
        }
      </TouchableOpacity>
    </View>
  );
}