import { useState } from 'react';
import dayjs from 'dayjs';

export default function useCalendar() {
  const now = dayjs();
  const [selectedDate, setSelectedDate] = useState(now);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    // console.log("A date has been picked: ", date);
    setSelectedDate(dayjs(date));
    hideDatePicker();
  };
  const add1Month = () => {
    setSelectedDate(dayjs(selectedDate).add(1, 'month'));
  };
  const subtract1Month = () => {
    setSelectedDate(dayjs(selectedDate).subtract(1, 'month'));
  };

  return {
    selectedDate, isDatePickerVisible, setSelectedDate,
    showDatePicker, hideDatePicker, handleConfirm,
    onPressLeftArrow: subtract1Month,
    onPressRightArrow: add1Month,
  }
}