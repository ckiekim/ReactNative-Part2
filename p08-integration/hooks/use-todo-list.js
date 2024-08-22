import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
// import { defaultTodoList } from '@/assets/data/mock-todo-list';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TODO_LIST_KEY = 'todo';

export default function useTodoList(selectedDate) {
  const [todoList, setTodoList] = useState();
  const [input, setInput] = useState('');
  
  useEffect(() => {
    initStorage();
  }, []);
  const initStorage = async () => {
    try {
      const result = await AsyncStorage.getItem(TODO_LIST_KEY);
      if (result !== null)
        setTodoList(JSON.parse(result));
      else
        setTodoList([]);
    } catch (error) {
      console.log(error);
    }
  }

  const handleTodoList = (newTodoList) => {
    setTodoList(newTodoList);
    AsyncStorage.setItem(TODO_LIST_KEY, JSON.stringify(newTodoList));
  }

  const addTodo = () => {
    const len = todoList.length;
    const lastId = len === 0 ? 0 : todoList[len - 1].id;
    const newTodoList = [
      ...todoList, 
      { id: lastId + 1, content: input, date: selectedDate, isSuccess: false }
    ];
    handleTodoList(newTodoList);
    setInput('');
  }
  const removeTodo = (todoId) => {
    const newTodoList = todoList.filter(todo => todo.id !== todoId);
    handleTodoList(newTodoList);
  }
  const toggleTodo = (todoId) => {
    const newTodoList = todoList.map(todo => {
      if (todo.id !== todoId)
        return todo;
      return {
        ...todo, isSuccess: !todo.isSuccess
      };
    });
    handleTodoList(newTodoList);
  }

  return {
    input, setInput,
    todoList,
    filteredTodoList: todoList?.filter(todo => dayjs(selectedDate).isSame(todo.date, 'date')),
    addTodo, removeTodo, toggleTodo
  }
}