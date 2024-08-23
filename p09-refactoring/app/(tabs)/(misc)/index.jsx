import { useCallback, useRef } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, FlatList, Image, Pressable, StyleSheet, Text, View, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Ionicons from '@expo/vector-icons/Ionicons';

import useCalendar from '@/hooks/use-calendar';
import useTodoList from '@/hooks/use-todo-list';
import AddTodoInput from '@/components/AddTodoInput';
import Calendar from '@/components/Calendar';
import Margin from '@/components/Margin';
import { statusBarHeight, bottomSpace, ITEM_WIDTH } from '@/constants/size';

export default function MiscScreen() {
  const {
    selectedDate, isDatePickerVisible, setSelectedDate,
    showDatePicker, hideDatePicker, handleConfirm, onPressLeftArrow, onPressRightArrow,
  } = useCalendar();
  const {
    input, setInput, todoList, filteredTodoList, addTodo, removeTodo, toggleTodo
  } = useTodoList(selectedDate);

  const flatListRef = useRef(null);

  const ListHeaderComponent = () => (
    <View>
      <Calendar
        todoList={todoList}
        selectedDate={selectedDate} 
        setSelectedDate={setSelectedDate} 
        onPressLeftArrow={onPressLeftArrow} 
        showDatePicker={showDatePicker} 
        onPressRightArrow={onPressRightArrow}
      />
      <Margin height={10} />
      <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#a3a3a3', alignSelf: 'center' }} />
      <Margin height={10} />
    </View>
  );
  
  const renderItem = ({ item: todo }) => {
    const onLongPress = () => {
      Alert.alert('삭제하시겠습니까?', '', [
        { style: 'cancel', text: '아니오' },
        { text: '네', onPress: () => removeTodo(todo.id) }
      ]);
    };

    return (
      <Pressable 
        onPress={() => {toggleTodo(todo.id)}}     // () => {toggleTodo(todo.id)} 도 가능
        onLongPress={onLongPress}
        style={{ 
          flexDirection: 'row', alignItems: 'center',
          width: ITEM_WIDTH, // backgroundColor: todo.id % 2 === 0 ? 'yellow' : 'skyblue',
          alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 5,
          borderBottomWidth: 0.2, borderBottomColor: '#a6a6a6'
        }}
      >
        <Text style={{ flex: 1, fontSize: 14, color: '#595959' }}>{todo.content}</Text>
        {todo.isSuccess &&
          <Ionicons name="checkmark" size={18} color="#595959" />
        }
      </Pressable>
    );
  };

  /*
  const renderItem = useCallback(({ item: todo }) => {
    const handlePress = () => {
      toggleTodo(todo.id);
    };
  
    const onLongPress = () => {
      Alert.alert('삭제하시겠습니까?', '', [
        { style: 'cancel', text: '아니오' },
        { text: '네', onPress: () => removeTodo(todo.id) }
      ]);
    };
  
    return (
      <Pressable
        onPress={handlePress}
        onLongPress={onLongPress}
        style={{
          flexDirection: 'row', alignItems: 'center',
          width: ITEM_WIDTH, alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 5,
          borderBottomWidth: 0.2, borderBottomColor: '#a6a6a6'
        }}
      >
        <Text style={{ flex: 1, fontSize: 14, color: '#595959' }}>{todo.content}</Text>
        {todo.isSuccess &&
          <Ionicons name="checkmark" size={18} color="#595959" />
        }
      </Pressable>
    );
  }, [todo.id, toggleTodo, removeTodo]);
  */

  const scrollToEnd = () => {        // 추가후에 포커스가 리스트의 마지막으로 가게 함
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 300);
  }
  const onAdd = () => {
    addTodo();
    scrollToEnd();
  }

  return (
    <Pressable      // 키보드가 열려 있을때 아무곳이나 누르면 키보드가 사라짐
      style={styles.container}
      onPress={Keyboard.dismiss}   // onPress={() => Keyboard.dismiss()} 와 동일
    >
      <Image 
        source={{uri: "https://img.freepik.com/free-photo/white-crumpled-paper-texture-background-design-space-white-tone_1258-78696.jpg?t=st=1723167237~exp=1723170837~hmac=49b8b76b475c487b5b412eb9d42c247ab444e2df9f4e1fde2b55afff5058b5e4&w=1060"}} 
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}   // 키보드가 열렸을때 TextInput 상자가 보이도록
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200}   // 키보드가 열렸을때 TextInput 상자가 보이도록
      >
        <FlatList
          ref={flatListRef}
          data={filteredTodoList}
          keyExtractor={item => `todo-${item.id}`}
          focusable={true}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: statusBarHeight, paddingBottom: 100 }}   // TextInput이 가려지지 않도록 paddingBottom 조절
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
          showsVerticalScrollIndicator={false}
        />
        <AddTodoInput 
          input={input} 
          setInput={setInput} 
          selectedDate={selectedDate} 
          onPress={onAdd}
          onFocus={scrollToEnd}
        />
      </KeyboardAvoidingView>
      <Margin height={bottomSpace} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});