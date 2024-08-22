import dayjs from 'dayjs';

export const defaultTodoList = [
  {
    id: 1,
    content: '운동하기',
    date: dayjs(),
    isSuccess: true,
  },
  {
    id: 2,
    content: '공부하기',
    date: dayjs(),
    isSuccess: false,
  },
  {
    id: 3,
    content: '지인과 식사하기',
    date: dayjs(),
    isSuccess: true,
  },
];
