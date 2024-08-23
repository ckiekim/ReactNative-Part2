import dayjs from 'dayjs';

export function getCalendarColumns(now) {
  const start = dayjs(now).startOf('month');    // 2024-08-01
  const end = dayjs(now).endOf('month');        // 2024-08-31
  const endDate = dayjs(end).get('date');       // 31

  const columns = [];
  for (let i = 0; i < endDate; i++) {
    const date = dayjs(start).add(i, 'day');
    columns.push(date);
  }

  return fillEmplyColumns(columns, start, end);
}

function fillEmplyColumns(columns, start, end) {
  const filledColumns = columns.slice(0);   // 배열 columns의 index 0 부터 끝까지 새로운 배열 filledColumns에 shallow copy

  // 첫날 이전 공백 채우기(전월)
  const startDay = dayjs(start).get('day');   // 요일 (0 ~ 6)
  for (let i = 1; i <= startDay; i++) {
    const date = dayjs(start).subtract(i, 'day');
    filledColumns.unshift(date);    // 배열 맨 앞쪽에 추가하고 새로운 길이를 반환
  }

  // 마지막날 이후 공백 채우기(익월)
  const endDay = dayjs(end).get('day');
  for (let i = 1; i <= 6 - endDay; i++) {
    const date = dayjs(end).add(i, 'day');
    filledColumns.push(date);
  }
  return filledColumns;
}
