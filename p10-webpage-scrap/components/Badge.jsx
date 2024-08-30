import { Text, View } from "react-native";


export default function Badge({ children }) {
  return (
    <View>
      {children}
      <View 
        style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: 'red',
          alignItems: 'center', justifyContent: 'center',
          position: 'absolute', right: -10, top: -3
        }}
      >
        <Text style={{ fontSize: 10, color: 'white' }}>N</Text>
      </View>
    </View>
  )
}