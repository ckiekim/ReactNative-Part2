import { View } from 'react-native';

export default function Spacer({ space, isHorizontal }) {
  if (isHorizontal)
    return <View style={{ marginLeft: space }} />

  return <View style={{ marginTop: space }} />
}