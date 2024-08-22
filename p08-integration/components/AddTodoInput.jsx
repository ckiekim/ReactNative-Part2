import { TextInput, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import dayjs from 'dayjs';
import { bottomSpace, ITEM_WIDTH } from '@/constants/size';
 
export default function AddTodoInput({ input, setInput, selectedDate, onPress, onFocus }) {
  return (
    <View
      style={{ 
        width: ITEM_WIDTH,    // marginBottom: bottomSpace, 
        flexDirection: 'row', alignItems: 'center', alignSelf: 'center'
      }}
    >
      <TextInput 
        value={input} 
        onChangeText={setInput} 
        placeholder={`${dayjs(selectedDate).format('M월 D일')}에 추가할 할 일`}
        style={{ 
          flex: 1, paddingHorizontal: 5, color: '#595959',
          borderBottomWidth: 0.2, borderBottomColor: '#a6a6a6' 
        }}
        onSubmitEditing={onPress}
        blurOnSubmit={false}      // 키보드에서 완료(리턴) 키를 입력한 후에도 키보드가 닫히지 않게 함
        onFocus={onFocus}
      />
      <TouchableOpacity onPress={onPress} style={{ padding: 5 }}>
        <AntDesign name="plus" size={20} color="#595959" />
      </TouchableOpacity>
    </View>
  )
}